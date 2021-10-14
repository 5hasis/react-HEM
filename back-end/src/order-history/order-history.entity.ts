import { Menu } from "src/menu/menu.entity";
import { Order } from "src/order/order.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class OrderHistory extends BaseEntity{

    @PrimaryGeneratedColumn()
    orderHistoryNo : number;

    @Column("int")
    orderAmount:number;

    //{cascade:true} 해야할지 ..
    
    @ManyToOne(type => Order, order => order.orderHistory)
    order:Order

    
    @ManyToOne(() => Menu, menu => menu.orderHistory)
    menus: Menu;
}