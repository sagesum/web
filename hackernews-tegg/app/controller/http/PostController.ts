import { Context, HTTPBody, HTTPContext, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPParam, HTTPQuery, Inject } from "egg";
import PostService from "../../module/blog/service/PostService.ts";
import AuthService from "../../module/blog/service/AuthService.ts";
interface CreatePostReq {
    title: string
    content: string
    coverUrl?: string
}
@HTTPController()
export default class PostController {

    @Inject()
    postService: PostService
    @Inject()
    authService: AuthService

    @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/api/posts' })
    async getPostSummary(
        @HTTPQuery() page?: string,
        @HTTPQuery() pageSize?: string
    ) {
        const pageNumber = Math.max(1, Math.floor(Number(page) || 1));
        const pageSizeNumber = Math.min(50, Math.max(1, Math.floor(Number(pageSize) || 10)));     
        const result = await this.postService.getPostSummary(pageNumber, pageSizeNumber)
        return { data: result.items, hasMore: result.hasMore }   

    }

    @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/api/posts/:id' })
    async getPostByid(@HTTPParam() id: string, @HTTPContext() ctx: Context) {
        const result = await this.postService.getPostById(id)
        if (!result) ctx.throw(404, '文章不存在')
        return { data: result }
    }
    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/api/posts' })
    async createPost(@HTTPBody() body: CreatePostReq, @HTTPContext() ctx: Context) {
        this.ensureAdmin(ctx);
        
        const title = body?.title?.trim()
        const content = body?.content?.trim()
        if (!title || !content) ctx.throw(400, '标题和正文都不能为空')

        
        const post = await this.postService.createPost(title, content)
        return { data: post }
    }
    @HTTPMethod({ method: HTTPMethodEnum.DELETE, path: '/api/posts/:id' })
    async deletePost(@HTTPParam() id: string, @HTTPContext() ctx: Context) {
        this.ensureAdmin(ctx);
        const result = await this.postService.deletePost(id)
        if (!result) ctx.throw(404, '文章不存在')
        return { data: { id } }        

    }

    private ensureAdmin(ctx: Context) {
        const token = ctx.headers.authorization?.replace(/^Bearer\s+/, '')
        if (!this.authService.verify(token)) ctx.throw(401, '请先登录')
    }
}
