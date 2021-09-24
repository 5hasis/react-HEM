import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Visited extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    visitedNumber : number;

    @Column()
    visitedName : string;

    @Column()
    visitedPhone : string;

    @Column()
    visitedAddress : string;

    @Column({ type: 'timestamptz', nullable: false })
    visitedTime : Date;


}