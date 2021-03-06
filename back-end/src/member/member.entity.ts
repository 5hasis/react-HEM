import { Menu } from "src/menu/menu.entity";
import { OrderHistory } from "src/order-history/order-history.entity";
import { Order } from "src/order/order.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Unique, BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity()
@Unique(['memberId'])
export class Member extends BaseEntity {

    @PrimaryGeneratedColumn()
    memberNo: number;

    @Column()
    memberName: string;

    @Column()
    memberAddress: string;

    @Column()
    memberPhone: string;

    @Column()
    memberId: string;

    @Column()
    memberPw: string;

    @Column()
    memberEmail: string;

    @Column()
    memberBoss: string;

    @OneToMany(type => Menu, menu => menu.member)
    menus: Menu[];

    @OneToMany(type => Order, orders => orders.member)
    orders: Order[];

    @OneToMany(type => Reservation, reservation => reservation.member,{eager:true})
    reservations: Reservation[];

    @OneToMany(type => OrderHistory, orderHistory => orderHistory.member, { eager: true })
    orderHistory:OrderHistory[];

}