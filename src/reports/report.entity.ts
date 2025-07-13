import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
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
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    mileage: number;
}