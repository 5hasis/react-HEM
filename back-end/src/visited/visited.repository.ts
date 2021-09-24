import { EntityRepository, Repository } from "typeorm";
import { VisitWriteDto } from "./dto/visit-write.dto";
import { Visited } from './visited.entity';

@EntityRepository(Visited)
export class VisitedRepository extends Repository<Visited> {
    async writeList(visitWriteDto : VisitWriteDto):Promise<void>{

        const { 
            visitedName,
            visitedPhone,
            visitedAddress } = visitWriteDto;

        const visited = this.create({
            visitedName,
            visitedPhone,
            visitedAddress,
            visitedTime:new Date()
        });

        await this.save(visited);

    }
}