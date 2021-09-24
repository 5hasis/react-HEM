import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Member } from "./member.entity";
import { MemberRepository } from "./member.repository";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository: MemberRepository
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { memberId } = payload;
        const member: Member = await this.memberRepository.findOne({ memberId });

        if(!member) {
            throw new UnauthorizedException();
        }

        return member;
    }
}