import { Member } from "src/server/member/member.entity";
import { Menu } from "src/server/menu/menu.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn()
    orderNumber:number;

    @Column()
    orderTableNumber:string;

    @Column()
    orderPrice:number;

    @ManyToOne(() => Member, member => member.orders)
    member: Member;

    @ManyToMany(() => Menu)
    @JoinTable()
    menus: Menu[];
}