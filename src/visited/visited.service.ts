import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitWriteDto } from "./dto/visit-write.dto";
import { VisitedRepository } from './visited.repository';

@Injectable()
export class VisitedService {
    constructor(
        @InjectRepository(VisitedRepository)
        private visitedRepository : VisitedRepository
    ){}

    async writeList(visitWriteDto : VisitWriteDto):Promise<void>{
        return this.visitedRepository.writeList(visitWriteDto);

    }
}
