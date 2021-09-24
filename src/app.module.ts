import { Module } from '@nestjs/common';
import { MemberModule } from './server/member/member.module';
import { VisitedModule } from './server/visited/visited.module';
import { typeORMConfig } from './server/configs/typeorm.config'
import { OrderModule } from './server/order/order.module';
import { MenuModule } from './server/menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationModule } from './server/reservation/reservation.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    OrderModule,
    MenuModule,
    MemberModule, VisitedModule, ReservationModule
  ],
})
export class AppModule { }

