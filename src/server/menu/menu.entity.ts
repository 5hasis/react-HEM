import { Member } from "src/server/member/member.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

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

}