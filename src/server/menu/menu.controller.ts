import { Param,UseGuards ,Controller, Get, Request, Post, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';
import {MenuCreateDto} from './dto/menu-create.dto'

@Controller('menu')
export class MenuController {

    constructor(
        private menuService:MenuService
    ){}

    // 메뉴 등록
    @Post()
    @UseGuards(AuthGuard())
    insertMenu(
        @Body() menuCreateDto : MenuCreateDto,
        @Request() req
        ){
            menuCreateDto.member = req.user
            // console.log(menuCreateDto.member.memberName)
            this.menuService.createMenu(menuCreateDto)
    }

    // 메뉴 리스트
    @Get('/:memberNo')
    getMenuList(
        @Param('memberNo') memberNo:number):Promise<Menu[]>{
            return this.menuService.getMenuList(memberNo)
    }

    // 메뉴 상세
    @Get('/:memberNo/:menuNo')
    getMenu(
        @Param("memberNo") memberNo:number,
        @Param("menuNo") menuNo:number,
    ):Promise<Menu>{
        return this.menuService.getMenu(memberNo,menuNo)
    }

    // 메뉴 삭제
    @Delete('/:menuNo')
    @UseGuards(AuthGuard())
    deleteMenu(
        @Param("menuNo") menuNo:number,
        @Request() req
    ){
        this.menuService.deleteMenu(req.user.memberNo,menuNo)
    }


}
