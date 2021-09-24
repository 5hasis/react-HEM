import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {

    constructor(private reservationService:ReservationService){}

    @Get()
    getAllReservation():Promise<Reservation[]>{
        return this.reservationService.getAllReservations();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createReservation(@Body() createReservationDto:CreateReservationDto        
                    ):Promise<Reservation>{
        return this.reservationService.createReservation(createReservationDto);
    }

    @Get('/:reservationName')
    getReservationByName(@Param('reservationName') reservationName:string):Promise<Reservation>{
        return this.reservationService.getReservationByName(reservationName);
    }

    @Delete('/:reservationName')
    deleteReservation(@Param('reservationName') reservationName:string):Promise<void>{
        return this.reservationService.deleteReservation(reservationName);
    }
    
    @Patch('/:reservationName')
    updateReservation(@Param('reservationName') reservationName:string):Promise<Reservation>{
        return this.reservationService.updateReservation(reservationName);
    }
}
