import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers() {
        return await this.userService.findAll();
    }
}
