import { IsNotEmpty } from "class-validator";
import {Member} from '../../member/member.entity'
import {Menu} from '../../menu/menu.entity'

export class OrderCreateDto {
    orderTableNumber : string

    orderPrice : number

    member : Member

    menus : Menu[]
}