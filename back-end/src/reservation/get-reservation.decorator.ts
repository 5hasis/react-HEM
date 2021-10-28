import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Reservation } from "./reservation.entity";

export const GetReservation = createParamDecorator((data, ctx: ExecutionContext): Reservation => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})