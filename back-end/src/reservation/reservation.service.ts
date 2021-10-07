import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { create } from 'domain';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './reservation.entity';
import { Member } from 'src/member/member.entity';
@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(ReservationRepository)
        private reservationRepository:ReservationRepository,
    ){}
    
    async getAllReservations():Promise<Reservation[]>{
        return this.reservationRepository.find();
    }

    async createReservation(createReservationDto:CreateReservationDto,member:Member):Promise<{reservationSuccess:boolean}>{
      return this.reservationRepository.createReservation(createReservationDto,member);
    }

    async getReservationByName(reservationName:string):Promise<Reservation>{
        const found=await this.reservationRepository.findOne(reservationName);
        if(!found){
            throw new NotFoundException(`Can't find reservation with name ${reservationName}`);
        }
        return found;
    }
   
    async deleteReservation(reservationName:string):Promise<void>{
        const result=await this.reservationRepository.delete(reservationName);
        if(result.affected===0){
            throw new NotFoundException(`Can't find reservation with name ${reservationName}`)
        }
    }
    
    async updateReservation(reservationName:string):Promise<Reservation>{
        const reservation=await this.getReservationByName(reservationName);

        await this.reservationRepository.save(reservation);
        return reservation;
    }
}
