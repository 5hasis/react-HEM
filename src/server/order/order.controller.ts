import { Body, Controller, Post,Get,Param,UseGuards,Delete,Request } from '@nestjs/common';
import { OrderService } from './order.service';
import {OrderCreateDto} from './dto/order-create.dto'
import { AuthGuard } from '@nestjs/passport';
import { Order } from './order.entity';
import { MemberService } from 'src/server/member/member.service';

@Controller('order')
export class OrderController {

    constructor(
        private orderService:OrderService,
    ){}

    // 주문 등록
    @Post()
    insertOrder(
        @Body() orderCreateDto : OrderCreateDto,
        ){
            this.orderService.createOrder(orderCreateDto)
    }

    // // 주문 리스트
    @Get('/memberNo/:memberNo')
    getOrderList(
        @Param('memberNo') memberNo:number):Promise<Order[]>{
            return this.orderService.getOrderList(memberNo)
    }

    // // 주문 상세
    @Get('/orderNo/:orderNo')
    getOrder(
        @Param("orderNo") orderNo:number,
    ):Promise<Order>{
        return this.orderService.getOrder(orderNo)
    }

    @Delete('/:orderNo')
    deleteMenu(
        @Param("orderNo") orderNo:number,
    ){
        this.orderService.deleteOrder(orderNo)
    }

}