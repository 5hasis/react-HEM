import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { create } from 'domain';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './reservation.entity';
import { Member } from 'src/member/member.entity';
import { MemberRepository } from 'src/member/member.repository';
import { UpdateReservationDto } from './dto/update-reservation.dto';

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
                                .leftJoinAndSelect('reservation.member','member')
                                .where('reservation.reservationPhone = :reservationPhone', {reservationPhone:reservationPhone})
                                .getMany();
        if(!found){
            throw new NotFoundException(`Can't find reservation with number ${reservationPhone}`);
        }
        return found;
    }

    async getDetailByNo(reservationNo:number):Promise<Reservation> {
        const reservation = this.reservationRepository.findOne({reservationNo});
        return reservation
    }
   
    async deleteReservation(reservationNo:number):Promise<void>{
        const result=await this.reservationRepository.delete(reservationNo);
        if(result.affected===0){
            throw new NotFoundException(`Can't find reservation with name ${reservationNo}`)
        }
    }
    
    async getReservationByNo(reservationNo:number):Promise<Reservation>{
        const result=this.reservationRepository
                        .createQueryBuilder('reservation')
                        .where('reservation.reservationNo=:reservationNo',{reservationNo})
                        .getOne();
        return result;
    }

    async getHistoryByNo(memberNo:number){
        const result=await this.reservationRepository
                        .createQueryBuilder('reservation')
                        .leftJoinAndSelect('reservation.member','member')
                        .where('member.memberNo=:memberNo',{memberNo})
                        .getMany();
        return result;
    }
   
    async updateReservation(updateReservationDto:UpdateReservationDto,reservation:Reservation):Promise<Reservation>{
        const{
            reservationNo,
            reservationName,
            reservationDate,
            reservationTime,
            reservationPeople,
            reservationState
        }=updateReservationDto;
        
        const myReservation=await this.getReservationByNo(reservationNo);
        
        myReservation.reservationName=reservationName;
        myReservation.reservationDate=reservationDate;
        myReservation.reservationTime=reservationTime;
        myReservation.reservationPeople=reservationPeople;
        myReservation.reservationState=reservationState;
        await this.reservationRepository.save(myReservation);
        return myReservation;
    }



}


