import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    // console.info(req.body);
    const username = req.body['username'] as string;
    if (!username) {
      throw new HttpException({
        status: 401,
        message: 'Unauthorize'
      }, 401);
    }

    // const user = await this.prismaService.user.findFirst({
    //   where: {
    //     nik: username,
    //   },
    // });

    // if (user) {
    //   req.user = user;
    //   next();
    // }else{
    //   throw new HttpException({
    //     status: 401,
    //     message: 'Username Tidak Ditemukan'
    //   }, 401);
    // }
  }
}
