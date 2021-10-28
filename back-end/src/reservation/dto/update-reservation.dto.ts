import { IsNotEmpty } from "class-validator";
export class UpdateReservationDto{
    @IsNotEmpty()
    reservationNo:number;
    @IsNotEmpty()
    reservationName: string;
    @IsNotEmpty()
    reservationDate: Date;
    @IsNotEmpty()
    reservationTime : string;
    @IsNotEmpty()
    reservationPeople : number;

}