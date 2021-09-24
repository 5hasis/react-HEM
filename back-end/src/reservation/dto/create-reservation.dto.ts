import { IsNotEmpty } from "class-validator";


export class CreateReservationDto {
    @IsNotEmpty()
    reservationName : string;
    @IsNotEmpty()
    reservationPhone : string;
    @IsNotEmpty()
    reservationDate: Date;
    @IsNotEmpty()
    reservationTime : Date;
    @IsNotEmpty()
    reservationPeople : number;

    //
}

