import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { signInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { UserGuard } from './Guards/user.guard';
import { User } from './Decorators/User';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.pwd=await bcrypt.hash(createUserDto.pwd, 12);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll(@User() user:any) {
      return this.usersService.findAll(user);
  }

  @Get("myuser")
  @UseGuards(UserGuard)
  findMyUser(@User() user:any) {
      return user;
  }

  @Get(":id")
  @UseGuards(UserGuard)
  findOne(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }
  @Get("user/:email")
  @UseGuards(UserGuard)
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  
  @Post('login')
  async login(@Body() signInDto: signInDto) {
   return this.usersService.login(signInDto);
  }
  
}
