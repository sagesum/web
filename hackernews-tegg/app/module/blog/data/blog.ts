import { RowDataPacket } from "mysql2"

export interface PostSummary{
    id:string
    title:string
    coverUrl?:string
    createTime :string
    isPublished:boolean
}

export interface Post extends PostSummary{
    content:string
}
export interface PostRow extends RowDataPacket {     
    id: string;
    title: string;
    content: string;
    cover_url: string | null;                 
    create_time: Date;                        
    is_published: 0 | 1;                      
}