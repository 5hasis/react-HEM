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
    reservationTime : String;

    @Column()
    reservationPeople : number;

    @ManyToOne(type => Member, member => member.reservations,{eager:false})
    member:Member;

}