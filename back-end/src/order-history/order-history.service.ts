import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuRepository } from 'src/menu/menu.repository';
import { OrderRepository } from 'src/order/order.repository';
import { OrderHistoryCreateDto } from './dto/order-history-create.dto';
import { OrderHistory } from './order-history.entity';
import { OrderHistoryRepository } from './order-history.repository';

@Injectable()
export class OrderHistoryService {
    constructor(
        @InjectRepository(OrderHistoryRepository)
        private orderHistoryRepository:OrderHistoryRepository,
        private orderRepository:OrderRepository,
        private menuRepository:MenuRepository,
    ){}

    async createOrder(orderHistoryCreateDto : OrderHistoryCreateDto) : Promise<OrderHistory>{
        const {
                orderAmount,
                menusMenuNumber,
                orderOrderNumber
            } = orderHistoryCreateDto;

        const menu = await this.menuRepository.findOne(menusMenuNumber);
        const order = await this.orderRepository.findOne(orderOrderNumber);


        const orders = new OrderHistory();
        orders.orderAmount = orderAmount;
        orders.menus = menu;
        orders.order = order;

        await this.orderHistoryRepository.save(orders)
        return orders
    }

    async getOrderList(memberNo : number) {

        const orderList = await this.orderHistoryRepository
                            .createQueryBuilder('orderHistory')
                            .where('order.memberNo = :memberNo', { memberNo: memberNo })
                            .getMany();

        return orderList;
    }
}
