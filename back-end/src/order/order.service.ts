import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from 'src/member/member.repository';
import { OrderHistory } from 'src/order-history/order-history.entity';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository:OrderRepository,
        private memberRepository:MemberRepository,
    ){}


    async createOrder({orderPrice, orderTableNumber,memberMemberNo} : OrderCreateDto):Promise<Order>{
        const member = await this.memberRepository.findOne(memberMemberNo);
      
        const order = this.orderRepository.create(
            {
                orderPrice,
                orderTableNumber,
                member,
            })
        await this.orderRepository.save(order)
        return order;
    }

    async getOrderList(memberNo : number):Promise<Order[]>{
        
        return await this.orderRepository.find({member:{
            memberNo
        }})
    }

    async getOrder(orderNumber:number ):Promise<Order>{
        return await this.orderRepository.findOne({
            orderNumber
        })
    }

    async updateOrder(currentOrder:Order , updateOrder:Order){
        const result = await this.orderRepository.update(currentOrder,updateOrder)
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Order`)
        }
    }

    async deleteOrder(orderNumber:number){
        const result = await this.orderRepository.delete(orderNumber)
        if(result.affected === 0){
            throw new NotFoundException(`Can't find order`)
        }
    }

}
