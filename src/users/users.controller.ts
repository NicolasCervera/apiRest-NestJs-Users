import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){

    }

    @Post()
    createUser(@Body() newUser:CreateUserDto)
    {
        return this.userService.creatUser(newUser)
    }

    @Get()
    getUsers(): Promise<User[]>
    {
        return this.userService.getAllUsers()
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.getById(id)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.deleteUser(id)
    }

    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto)
    {
        return this.userService.updateUser(id, user)
    }
}
