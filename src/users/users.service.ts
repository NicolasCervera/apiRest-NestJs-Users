import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './user.entity';
import {Repository} from 'typeorm'
import {CreateUserDto} from './dto/createuser.dto'
import { UpdateUserDto } from './dto/updateuser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){
        
    }

    async creatUser(user: CreateUserDto)
    {
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if(userFound)
        {
            return new HttpException('Usuario existente', HttpStatus.FOUND)
        }

        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

    getAllUsers()
    {
        return this.userRepository.find()
    }

    async getById(id: number)
    {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!userFound)
        {
            return new HttpException('El usuario a editar no existe.', HttpStatus.NOT_FOUND)
        }

        return userFound;
    }

    deleteUser(id: number)
    {
        return this.userRepository.delete({id})
    }

    updateUser(id: number, user: UpdateUserDto)
    {
        return this.userRepository.update({id: id}, user)
    }
}
