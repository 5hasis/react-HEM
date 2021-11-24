import { Body, Controller, Post,Get,Param,UseGuards,Delete,Request, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import {OrderCreateDto} from './dto/order-create.dto'
import { AuthGuard } from '@nestjs/passport';
import { Order } from './order.entity';
import { MemberService } from 'src/member/member.service';

@Controller('/api/order')
export class OrderController {

    constructor(
        private orderService:OrderService,
    ){}

    // 주문 등록
    @Post()
    insertOrder(
        @Body() orderCreateDto : OrderCreateDto,
        ):Promise<Order>{
            return this.orderService.createOrder(orderCreateDto)
    }

    // // 주문 리스트
    @Get('/orderList/:memberNo')
    getOrderList(
        @Param('memberNo') memberNo:number):Promise<Order[]>{
            return this.orderService.getOrderList(memberNo)
    }

    // // 주문 상세
    @Get('/:orderNo')
    getOrder(
        @Param("orderNo") orderNo:number,
    ):Promise<Order>{
        return this.orderService.getOrder(orderNo)
    }

    @Patch('/:orderNo/approve')
    approveOrder(@Body() orderCreateDto : OrderCreateDto, @Param("orderNo") orderNo:number):Promise<void>{
        return this.orderService.approveOrder(orderCreateDto, orderNo)
}

    @Delete('/:orderNo')
    deleteMenu(
        @Param("orderNo") orderNo:number,
    ){
        this.orderService.deleteOrder(orderNo)
    }

}