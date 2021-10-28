import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Member } from 'src/member/member.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';

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

    @Get('/detail/:reservationNumber')
    getDetailByNo(@Param('reservationNumber') reservationNumber:number):Promise<Reservation> {
        return this.reservationService.getDetailByNo(reservationNumber);
    }

    @Get('/:reservationPhone')
    getReservationByPhone(@Param('reservationPhone') reservationPhone:string):Promise<Reservation[]>{
        return this.reservationService.getReservationByPhone(reservationPhone);
    }

    @Delete('delete/:reservationNumber')
    deleteReservation(@Param('reservationNumber') reservationNumber:number):Promise<void>{
        return this.reservationService.deleteReservation(reservationNumber);
    }
    
    // @Patch('/:reservationName')
    // updateReservation(@Param('reservationName') reservationName:string):Promise<Reservation>{
    //     return this.reservationService.updateReservation(reservationName);
    // }
}
