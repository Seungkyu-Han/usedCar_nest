import {Entity, Column, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('users')
@Unique(['email'])
export class Users{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}