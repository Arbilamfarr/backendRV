import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RenduVousService } from './rendu-vous.service';
import { CreateRenduVousDto } from './dto/create-rendu-vous.dto';
import { UpdateRenduVousDto } from './dto/update-rendu-vous.dto';
import { UserGuard } from 'src/users/Guards/user.guard';
import { Request } from 'express';
import { User } from 'src/users/Decorators/User';

@Controller('rendu-vous')
export class RenduVousController {
  constructor(private readonly renduVousService: RenduVousService) {}

  @Post()
  @UseGuards(UserGuard)
  create(@Body() createRenduVousDto: CreateRenduVousDto) {
    return this.renduVousService.create(createRenduVousDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll(@User() user: any) {
      return this.renduVousService.findAll(user);

  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.renduVousService.findOne(+id);
  }

   @Get('centre/:centreId')
  @UseGuards(UserGuard)
  findByCentre(@Param('centreId') centreId: string) {
    return this.renduVousService.findByCentre(+centreId);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updateRenduVousDto: UpdateRenduVousDto) {
    return this.renduVousService.update(+id, updateRenduVousDto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  remove(@Param('id') id: string) {
    return this.renduVousService.remove(+id);
  }

  @Delete('user/:userId')
  @UseGuards(UserGuard)
  removeByUser(@Param('userId') userId: string) {
    return this.renduVousService.removeByUser(+userId);
  }
}
