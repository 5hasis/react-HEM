import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Member } from 'src/member/member.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { GetReservation } from './get-reservation.decorator';

@Controller('/api/reservation')
export class ReservationController {

    constructor(private reservationService:ReservationService){}

    @Get('/list')
    getAllReservation():Promise<Reservation[]>{
        return this.reservationService.getAllReservations();
    }

    @Post('/createReservation')
    @UsePipes(ValidationPipe)
    createReservation(@Body() createReservationDto:CreateReservationDto        
                    ):Promise<{reservationSuccess:boolean}>{
        return this.reservationService.createReservation(createReservationDto);
    }

    @Get('/detail/:reservationNo')
    getDetailByNo(@Param('reservationNo') reservationNo:number):Promise<Reservation> {
        return this.reservationService.getDetailByNo(reservationNo);
    }

    @Get('/reservationhistory/:memberNo')
    getHistoryByNo(@Param('memberNo') memberNo:number) {
        return this.reservationService.getHistoryByNo(memberNo);
    }

    @Get('/:reservationPhone')
    getReservationByPhone(@Param('reservationPhone') reservationPhone:string):Promise<Reservation[]>{
        return this.reservationService.getReservationByPhone(reservationPhone);
    }

    @Get('/myReservationInfo')
    getMyReservationByNo(@GetReservation() reservationNo:number):Promise<Reservation>{
        return this.reservationService.getReservationByNo(reservationNo);
    }

    @Delete('/delete/:reservationNo')
    deleteReservation(@Param('reservationNo') reservationNo:number):Promise<void>{
        return this.reservationService.deleteReservation(reservationNo);
    }
    
    @Patch('/update')
    updateReservation(@Body() updateReservationDto:UpdateReservationDto,
        @GetReservation() reservation:Reservation):Promise<Reservation>{
        return this.reservationService.updateReservation(updateReservationDto,reservation);
    }

    
    
    
}
