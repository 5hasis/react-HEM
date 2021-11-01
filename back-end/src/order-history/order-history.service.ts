import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from 'src/member/member.repository';
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
        private memberRepository:MemberRepository
    ){}

    async createOrder(orderHistoryCreateDto : OrderHistoryCreateDto) : Promise<OrderHistory>{
        const {
                orderAmount,
                menusMenuNumber,
                orderOrderNumber,
                memberMemberNo
            } = orderHistoryCreateDto;

        const menu = await this.menuRepository.findOne(menusMenuNumber);
        const order = await this.orderRepository.findOne(orderOrderNumber);
        const member = await this.memberRepository.findOne(memberMemberNo);


        const orders = new OrderHistory();
        orders.orderAmount = orderAmount;
        orders.menus = menu;
        orders.order = order;
        orders.member = member

        await this.orderHistoryRepository.save(orders)
        return orders
    }

    async getOrderHistory(orderNumber:number):Promise<OrderHistory[]>{
        const orderList = await this.orderHistoryRepository 
                            .createQueryBuilder('orderHistory') 
                            .leftJoinAndSelect('orderHistory.order', 'order')
                            .leftJoinAndSelect('orderHistory.menus', 'menus') 
                            //.leftJoinAndSelect('orderHistory.member', 'member')
                            .where('order.orderNumber = :orderNumber', { orderNumber }) 
                            .getMany();

        //console.log(orderList)
        return orderList;
    }
}
