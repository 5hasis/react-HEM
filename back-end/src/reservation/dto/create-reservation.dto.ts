import { isNotEmpty, IsNotEmpty } from "class-validator";


export class CreateReservationDto {
    @IsNotEmpty()
    reservationName : string;
    @IsNotEmpty()
    reservationPhone : string;
    @IsNotEmpty()
    reservationDate: Date;
    @IsNotEmpty()
    reservationTime : string;
    @IsNotEmpty()
    reservationPeople : number;
    @IsNotEmpty()
    memberMemberNo : number;

    
}

