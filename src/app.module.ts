import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { MemberModule } from './member/member.module';
import { VisitedModule } from './visited/visited.module';
import { typeORMConfig } from './configs/typeorm.config'
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationModule } from './reservation/reservation.module';
=======
import { MemberModule } from './server/member/member.module';
import { VisitedModule } from './server/visited/visited.module';
import { typeORMConfig } from './server/configs/typeorm.config'
import { OrderModule } from './server/order/order.module';
import { MenuModule } from './server/menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationModule } from './server/reservation/reservation.module';
>>>>>>> d3860899b3e757d7882b63252f75e5c02d8d3bc3


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    OrderModule,
    MenuModule,
    MemberModule, VisitedModule, ReservationModule
  ],
})
export class AppModule { }

