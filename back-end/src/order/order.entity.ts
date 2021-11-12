import { Member } from "src/member/member.entity";
import { OrderHistory } from "src/order-history/order-history.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn()
    orderNumber:number;

    @Column()
    orderTableNumber:string;

    @Column()
    orderPrice:number;

    @Column()
    orderStatus:string;

    @ManyToOne(type => Member, member => member.orders)
    member: Member;

    @OneToMany(type => OrderHistory, orderHistory => orderHistory.order, { eager: true })
    orderHistory:OrderHistory[];
}