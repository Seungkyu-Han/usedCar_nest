import {Column, PrimaryGeneratedColumn} from "typeorm";

export class Report{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    maker: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    Latitude: number;

    @Column()
    longitude: number;

    @Column()
    mileage: number;
}