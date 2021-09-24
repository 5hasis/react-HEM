import { IsNotEmpty } from "class-validator";

export class MemberUpdateDto {

    @IsNotEmpty()
    memberName : string;

    @IsNotEmpty()
    memberPhone : string;

    @IsNotEmpty()
    memberAddress : string;

    @IsNotEmpty()
    memberPw: string;

}