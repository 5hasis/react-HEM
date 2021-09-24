import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { MemberModule } from 'src/member/member.module';

@Module({
    imports: [
        MemberModule,
        TypeOrmModule.forFeature([OrderRepository])
    ],
    providers: [OrderService],
    controllers: [OrderController]
})
export class OrderModule {}
