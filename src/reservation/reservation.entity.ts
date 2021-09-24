import { Member } from "src/member/member.entity";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Reservation extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    reservationNumber : number;

    @Column()
    reservationName : string;

    @Column()
    reservationPhone : string;

    @Column()
    reservationDate: Date;

    @Column()
    reservationTime : Date;

    @Column()
    reservationPeople : number;

    @ManyToOne(() => Member, member => member.reservations)
    member:Member;

}