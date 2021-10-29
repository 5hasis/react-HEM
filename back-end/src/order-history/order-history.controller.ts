import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderHistoryCreateDto } from './dto/order-history-create.dto';
import { OrderHistoryService } from './order-history.service';
import { OrderHistory } from './order-history.entity';

@Controller('/api/orderhistory')
export class OrderHistoryController {
    constructor(
        private orderHistoryService:OrderHistoryService,
    ){}

    // 주문 등록
    @Post()
    createOrder(
        @Body() orderHistoryCreateDto : OrderHistoryCreateDto ):Promise<OrderHistory> {
            return this.orderHistoryService.createOrder(orderHistoryCreateDto);
    }

    @Get('/orderList/:orderNumber')
    getOrderHistory(@Param('orderNumber') orderNumber:number):Promise<OrderHistory[]>{
        return this.orderHistoryService.getOrderHistory(orderNumber)
    }
}
