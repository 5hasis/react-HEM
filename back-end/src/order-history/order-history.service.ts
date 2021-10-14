import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuRepository } from 'src/menu/menu.repository';
import { OrderHistoryCreateDto } from './dto/order-history-create.dto';
import { OrderHistory } from './order-history.entity';
import { OrderHistoryRepository } from './order-history.repository';

@Injectable()
export class OrderHistoryService {
    constructor(
        @InjectRepository(OrderHistoryRepository)
        private orderHistoryRepository:OrderHistoryRepository,
        private menuRepository:MenuRepository,
    ){}

    async createOrder(orderHistoryCreateDto : OrderHistoryCreateDto) : Promise<OrderHistory>{
        const {
                orderAmount,
                menusMenuNumber,
            } = orderHistoryCreateDto;

        const menu = await this.menuRepository.findOne(menusMenuNumber);

        const orders = new OrderHistory();
        orders.orderAmount = orderAmount;
        orders.menus = menu;


        await this.orderHistoryRepository.save(orders)
        return orders
    }
}
