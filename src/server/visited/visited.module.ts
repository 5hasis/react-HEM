import { Module } from '@nestjs/common';
import { VisitedService } from './visited.service';
import { VisitedController } from './visited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitedRepository } from './visited.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([VisitedRepository])
  ],
  providers: [VisitedService],
  controllers: [VisitedController]
})
export class VisitedModule { }
