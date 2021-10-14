import { IsNotEmpty } from "class-validator";
import {Order} from '../../order/order.entity'
import {Menu} from '../../menu/menu.entity'

export class OrderHistoryCreateDto {

    orderOrderNumber:number

    menusMenuNumber:number

    orderAmount : number

}