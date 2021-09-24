import { IsNotEmpty } from "class-validator";

export class VisitWriteDto {

    @IsNotEmpty()
    visitedName : string;

    @IsNotEmpty()
    visitedPhone : string;

    @IsNotEmpty()
    visitedAddress : string;
}