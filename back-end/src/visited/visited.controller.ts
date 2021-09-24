import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { VisitedService } from './visited.service';
import { VisitWriteDto } from "./dto/visit-write.dto";

@Controller('visited')
export class VisitedController {
    constructor(
        private visitedService : VisitedService
    ){}

    @Post('/write')
    writeList(@Body(ValidationPipe) visitWriteDto : VisitWriteDto):Promise<void>{
        return this.visitedService.writeList(visitWriteDto);
    }
}
