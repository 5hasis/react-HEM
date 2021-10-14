import { IsNotEmpty } from "class-validator";
import {Member} from '../../member/member.entity'

export class OrderCreateDto {
    orderTableNumber : string

    orderPrice : number

    member : Member

}