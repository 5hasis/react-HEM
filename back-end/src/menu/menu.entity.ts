import { Member } from "src/member/member.entity";
import { OrderHistory } from "src/order-history/order-history.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Menu extends BaseEntity{
    @PrimaryGeneratedColumn()
    menuNumber:number;

    @Column()
    menuName:string;

    @Column()
    menuPrice:number;
    
    @Column()
    menuStatus:string;

    @ManyToOne(() => Member, member => member.menus,{cascade:true})
    member: Member;

    @OneToMany(() => OrderHistory, orderHistory => orderHistory.menus)
    orderHistory: OrderHistory;

}