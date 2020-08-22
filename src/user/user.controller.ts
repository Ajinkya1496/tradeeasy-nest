/* eslint-disable @typescript-eslint/camelcase */
import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { Request } from 'express'
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers() {
        return await this.userService.findAll();
    }

    @Post('/login')
    async login(@Req() req: Request) {
        const { email, password } = req.body;
        return await this.authService.validateUser(email, password);
    }

    @Post('/register')
    async registerUser(@Req() req: Request) {
        const { first_name, last_name, email, password } = req.body;
        return await this.userService.saveUser(first_name, last_name, email, password);
    }
}
