import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from 'src/member/member.module';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';

@Module({
    imports: [
        MemberModule,
        TypeOrmModule.forFeature([MenuRepository])
    ],
    controllers: [MenuController],
    providers: [MenuService]
})
export class MenuModule {}
