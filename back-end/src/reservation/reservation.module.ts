import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from 'src/member/member.repository';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([ReservationRepository]),
    TypeOrmModule.forFeature([MemberRepository]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
