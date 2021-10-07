import { Member } from "src/member/member.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { Reservation } from "./reservation.entity";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation>{

    async createReservation(createReservationDto:CreateReservationDto,member:Member):Promise<{reservationSuccess:boolean}>{
        const{
            memberMemberNo,
            reservationName,
            reservationPhone,
            reservationDate,
            reservationPeople,
            reservationTime,
            } = createReservationDto;

        const reservation =new Reservation();
        reservation.reservationName=reservationName;
        reservation.reservationPhone=reservationPhone;
        reservation.reservationDate=reservationDate;
        reservation.reservationTime=reservationTime;
        reservation.reservationPeople=reservationPeople;
        reservation.member=member;
        
        await this.save(reservation);
        return { reservationSuccess:true }

        
    }
}

