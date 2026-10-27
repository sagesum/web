import { AccessLevel, SingletonProto } from "egg";
import { Post, PostRow } from "../data/blog.ts";
import { database } from "../data/database.ts";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

@SingletonProto({
    accessLevel: AccessLevel.PUBLIC,
})
export default class PostService {
    async getPostSummary(page: number, pageSize: number) {
        const offset = (page - 1) * pageSize;
        const [rows] = await database.execute<PostRow[]>(
            `SELECT id, title, cover_url, create_time, is_published
            FROM posts WHERE is_published = 1
            ORDER BY create_time DESC LIMIT ? OFFSET ?`,
            [pageSize, offset],
        );
        return {
            items: rows.map(r => this.toSummary(r)),
            hasMore: rows.length === pageSize,
        };
    }
    async getPostById(id: string) {
        const [rows] = await database.execute<PostRow[]>('select id,title,content,cover_url,create_time,is_published from posts where id=? and is_published=?', [id, 1]);
        const row = rows[0];
        return row ? this.toPost(row) : undefined;
    }
    
    async createPost(title: string, content: string) {
        const [rows] = await database.execute<RowDataPacket[]>(
            'SELECT MAX(CAST(SUBSTRING(id, 2) AS UNSIGNED)) AS maxId FROM posts',
        );
        const nextId = `p${Number(rows[0]?.maxId ?? 0) + 1}`;
        await database.execute(
            `INSERT INTO posts (id, title, content, cover_url, create_time, is_published)
        VALUES (?, ?, ?, ?, NOW(), 1)`,
            [nextId, title, content, null],
        );
        return this.getPostById(nextId);
    }
    
    async deletePost(id: string) {
        const [result] = await database.execute<ResultSetHeader>(
            'DELETE FROM posts WHERE id = ?',
            [id],
        );
        return result.affectedRows > 0;
    }

    toSummary(postRow: PostRow) {
        return {
            id: postRow.id,
            title: postRow.title,
            coverUrl: postRow.cover_url ?? undefined,        
            createTime: postRow.create_time.toISOString(),
            isPublished: postRow.is_published === 1,
        }
    }
    toPost(r: PostRow): Post {
        return { ...this.toSummary(r), content: r.content };
    }
}
