import { IsNotEmpty } from "class-validator";

export class MemberFindDto {

    memberId : string;
    memberPw : string;
    memberName : string;
    memberPhone : string;
}