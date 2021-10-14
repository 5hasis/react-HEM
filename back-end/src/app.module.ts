import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { VisitedModule } from './visited/visited.module';
import { typeORMConfig } from './configs/typeorm.config'
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationModule } from './reservation/reservation.module';
import { OrderHistoryController } from './order-history/order-history.controller';
import { OrderHistoryService } from './order-history/order-history.service';
import { OrderHistoryModule } from './order-history/order-history.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    OrderModule,
    MenuModule,
    MemberModule, VisitedModule, ReservationModule, OrderHistoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

