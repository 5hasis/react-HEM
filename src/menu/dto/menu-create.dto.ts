import { IsNotEmpty } from "class-validator";
import {Member} from '../../member/member.entity'

export class MenuCreateDto {
    menuName : string;

    menuPrice : number;

    member : Member;
    //
    //
}