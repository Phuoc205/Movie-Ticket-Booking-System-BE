import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
    ) {}

    async findAll() {
        return this.userRepo.find();
    }

    async findOne(id: string) {
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ['bookings'],
        });

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async remove(id: string) {
        return this.userRepo.delete(id);
    }
}