import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCredentialsDto } from './dto/member-credential.dto';
import { MemberSignInDto } from './dto/member-signIn.dto';
import { MemberRepository } from './member.repository';
import * as bcrypt from 'bcryptjs';
import { Member } from './member.entity';
import { MemberUpdateDto } from './dto/member-update.dto';
import { MemberFindDto } from './dto/member-find.dto';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository:MemberRepository,
        private jwtService : JwtService
    ){}


    //회원가입
    async signUp(memberCredentialsDto : MemberCredentialsDto) : Promise<{registerSuccess:boolean}> {
        return this.memberRepository.createMember(memberCredentialsDto);
    }

    //로그인
    async signIn(memberSignInDto : MemberSignInDto) : Promise<{accessToken:string,memberNo:number}> {
        const { memberId, memberPw } = memberSignInDto;
        const member = await this.memberRepository.findOne({memberId});

        if(member && (await bcrypt.compare(memberPw, member.memberPw))) {
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = { memberId }; //토큰에 중요한 정보 넣지 말기
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken:accessToken , memberNo:member.memberNo}; //객체로 리턴
        }  else {
            throw new UnauthorizedException('로그인 정보가 일치하지 않습니다.')
        }
    }

    //로그아웃
    async logout():Promise<{accessToken:string}> {
        const accessToken = '';
        return {accessToken : accessToken}
    }

    //회원 아이디 찾기
    async findId(memberFindDto : MemberFindDto): Promise<Member> {
        const {memberName, memberPhone} = memberFindDto;
        //console.log(memberName, memberPhone);
        const member = await this.memberRepository
                            .createQueryBuilder('member')
                            .select('member.memberId')
                            .where('member.memberName = :memberName', {memberName})
                            .andWhere('member.memberPhone = :memberPhone', {memberPhone})
                            .getOne();
        //console.log(member)

        if(member){
            return member
        } else {
            throw new UnauthorizedException('일치하는 정보가 없습니다')
        }
        
        

    }

    //회원 리스트
    async getAllMember():Promise <Member[]> {
        const restaurants =  this.memberRepository.find({
            select: ["memberNo", "memberName", "memberAddress", "memberPhone"],
            // where:{
            // },
            order:{
                memberNo: "ASC",
            }
        });

        return restaurants;
    }

    //식당 디테일
    getDetailByNo(memberNo:number):Promise<Member> {
        const member = this.memberRepository.findOne(memberNo, {
            select: ["memberName", "memberAddress", "memberPhone", "memberId"]
        });
        return member
    }

    //회원 삭제(자신의 정보만)
    async deleteMember(member:Member) : Promise<void> {
        const result = await this.memberRepository.delete(member.memberNo);
    }

    //회원 단일 조회
    //자신의 정보만 가져오게
    async getMemberByNo(member:Member) : Promise<Member>{
        const result = this.memberRepository
                            .createQueryBuilder('member')
                            .where('member.memberNo = :memberNo', {memberNo:member.memberNo})
                            .getOne();

        return result;
        
    }

    async getMemberByName(memberName:string) : Promise<Member[]>{
        const result = this.memberRepository
                            .createQueryBuilder('member')
                            .where('member.memberName LIKE :memberName', {memberName:`%${memberName}%`})
                            .getMany();

        return result;
        
    }

    async getMemberByAddress(memberAddress:string) : Promise<Member[]>{
        const result = this.memberRepository
                            .createQueryBuilder('member')
                            .where('member.memberAddress LIKE :memberAddress', {memberAddress:`%${memberAddress}%`})
                            .getMany();

        return result;
        
    }

    //회원정보수정
    //자신의 정보만 수정하도록
    async updateMember(memberUpdateDto : MemberUpdateDto, member:Member):Promise<Member> {
        console.log(member);
        const myInfo = await this.getMemberByNo(member);

        const {             
            memberPw, 
            memberName,
            memberAddress, 
            memberPhone } = memberUpdateDto;

        const salt = await bcrypt.genSalt();
        const hashedPw = await bcrypt.hash(memberPw, salt);

        
        myInfo.memberPw = hashedPw;
        myInfo.memberName = memberName;
        myInfo.memberAddress = memberAddress;
        myInfo.memberPhone = memberPhone;

        await this.memberRepository.save(myInfo);

        return myInfo;
        
    }
}
