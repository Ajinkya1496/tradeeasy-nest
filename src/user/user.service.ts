/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async saveUser(firstName, lastName, email, password): Promise<User> {
        const user = new User();
        user.first_name = firstName;
        user.last_name = lastName;
        user.email = email;
        user.hash = bcrypt.hashSync(password, 10);
        return await this.userRepo.save(user);
    }

    async findOne(email: string): Promise<User> {
        return await this.userRepo.findOne({
            email: email
        });
    }
}
