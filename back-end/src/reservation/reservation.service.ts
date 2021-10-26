import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { create } from 'domain';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './reservation.entity';
import { Member } from 'src/member/member.entity';
import { MemberRepository } from 'src/member/member.repository';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(ReservationRepository)
        private reservationRepository:ReservationRepository,
        private memberRepository:MemberRepository
    ){}
    
    async getAllReservations():Promise<Reservation[]>{
        return this.reservationRepository.find();
    }

    async createReservation(createReservationDto:CreateReservationDto):Promise<{reservationSuccess:boolean}>{
        const member=await this.memberRepository.findOne(createReservationDto.memberMemberNo)
      return this.reservationRepository.createReservation(createReservationDto,member);
    }


    async getReservationByPhone(reservationPhone:string):Promise<Reservation[]>{
        const found=await this.reservationRepository
                                .createQueryBuilder('reservation')
                                .where('reservation.reservationPhone = :reservationPhone', {reservationPhone:reservationPhone})
                                .getMany();
        if(!found){
            throw new NotFoundException(`Can't find reservation with number ${reservationPhone}`);
        }
        return found;
    }

    async getDetailByNo(reservationNumber:number):Promise<Reservation> {
        const reservation = this.reservationRepository.findOne({reservationNumber});
        return reservation
    }
   
    async deleteReservation(reservationNumber:number):Promise<void>{
        const result=await this.reservationRepository.delete(reservationNumber);
        if(result.affected===0){
            throw new NotFoundException(`Can't find reservation with name ${reservationNumber}`)
        }
    }
    
    // async updateReservation(reservationPhone:string):Promise<Reservation>{
    //     const reservation=await this.getReservationByPhone(reservationPhone);

    //     await this.reservationRepository.save(reservation);
    //     return reservation;
    // }
}
