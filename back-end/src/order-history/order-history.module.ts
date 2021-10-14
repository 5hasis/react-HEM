import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from 'src/menu/menu.module';
import { MenuRepository } from 'src/menu/menu.repository';
import { OrderModule } from 'src/order/order.module';
import { OrderRepository } from 'src/order/order.repository';
import { OrderHistoryController } from './order-history.controller';
import { OrderHistoryRepository } from './order-history.repository';
import { OrderHistoryService } from './order-history.service';

@Module({
    imports:[
        MenuModule,
        OrderModule,
        TypeOrmModule.forFeature([MenuRepository]),
        TypeOrmModule.forFeature([OrderRepository]),
        TypeOrmModule.forFeature([OrderHistoryRepository])
    ],
    providers: [OrderHistoryService],
    controllers: [OrderHistoryController]
})
export class OrderHistoryModule {}
