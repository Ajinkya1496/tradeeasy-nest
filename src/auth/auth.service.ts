import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import bcrypt = require('bcrypt');
import { User } from 'src/user/user.entity';
import { TradeeasyConstants } from 'src/tradeeasy.constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && bcrypt.compareSync(password, user.hash)) {
          return await this.login(user);
        }
        throw new HttpException(TradeeasyConstants.ERROR_MESSAGES.INVALID_USERNAME, HttpStatus.UNAUTHORIZED);
      }

    async login(user: User) {
        const payload = { username: user.email, sub: user.id, name: `${user.first_name} ${user.last_name}` };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
