import { EntityRepository, Repository } from "typeorm";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { Reservation } from "./reservation.entity";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation>{

    async createReservation(createReservationDto:CreateReservationDto):Promise<Reservation>{
        const{reservationName,reservationPhone,reservationDate,reservationPeople,reservationTime}=createReservationDto;
        const reservation=this.create({
            reservationName,
            reservationPhone,
            reservationDate,
            reservationPeople,
            reservationTime
        })
        
        await this.save(reservation);

        return reservation;
    }
}