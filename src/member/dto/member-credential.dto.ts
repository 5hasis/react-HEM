import { IsNotEmpty } from "class-validator";

export class MemberCredentialsDto {

    @IsNotEmpty()
    memberName : string;

    @IsNotEmpty()
    memberPhone : string;

    @IsNotEmpty()
    memberAddress : string;

    @IsNotEmpty()
    memberId: string;

    @IsNotEmpty()
    memberPw: string;

}