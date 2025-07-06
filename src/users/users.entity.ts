import {Entity, Column, PrimaryGeneratedColumn, Unique, AfterInsert} from "typeorm";

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

    @AfterInsert()
    logInsert(){
        console.log(`user inserted id: ${this.id}`);
    }
}