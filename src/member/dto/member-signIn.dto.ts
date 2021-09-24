import { IsNotEmpty } from "class-validator";

export class MemberSignInDto {

    @IsNotEmpty()
    memberId: string;

    @IsNotEmpty()
    memberPw: string;

}