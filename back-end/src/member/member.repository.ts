import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { MemberCredentialsDto } from "./dto/member-credential.dto";
import { Member } from "./member.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
    async createMember(memberCredentialsDto : MemberCredentialsDto) : Promise<{registerSuccess:boolean}> {
        const { 
            memberId, 
            memberPw, 
            memberName,
            memberAddress, 
            memberPhone,
            memberEmail,
            memberBoss
            } = memberCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPw = await bcrypt.hash(memberPw, salt);


        const member = this.create({
            memberId, 
            memberPw:hashedPw, 
            memberName,
            memberAddress, 
            memberPhone,
            memberEmail,
            memberBoss
        });

        try{
            await this.save(member);
            return { registerSuccess:true }
        } catch (error) {
            console.log('error',error);
            if(error.code === '23505') { //console.log 찍어보면 error code : 23505
                throw new ConflictException('이미 존재하는 아이디 입니다.');
            } else {
                throw new InternalServerErrorException();
            }
        }
        


    }
}