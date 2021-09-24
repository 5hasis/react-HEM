import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { VisitedModule } from './visited/visited.module';
import { typeORMConfig } from './configs/typeorm.config'
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationModule } from './reservation/reservation.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    OrderModule,
    MenuModule,
    MemberModule, VisitedModule, ReservationModule
  ],
})
export class AppModule { }

