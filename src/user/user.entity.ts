import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'tbl_users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    hash: string;

    @Column()
    salt: string;
}

