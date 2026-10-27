
import { Context, HTTPBody, HTTPContext, HTTPController, HTTPMethod, HTTPMethodEnum, Inject } from "egg";
import AuthService from "../../module/blog/service/AuthService.ts";

interface LoginReq {
    username: string;
    password: string;
}


@HTTPController()
export class AdminController {
    @Inject()
    authService: AuthService

    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/api/admin/login' })
    async login(@HTTPBody() body: LoginReq, @HTTPContext() ctx: Context) {
        const adminUser = process.env.ADMIN_USER ?? 'admin';        
        const adminPassword = process.env.ADMIN_PASSWORD ?? '';     

        
        if (body.username !== adminUser || !this.authService.safeEqual(body.password, adminPassword)) {
            ctx.throw(401, '用户名或密码错误');                      
        }

        const { token, expiresAt } = this.authService.issue(adminUser); 
        return { data: { token, expiresAt, user: { name: adminUser } } };
    }
}
