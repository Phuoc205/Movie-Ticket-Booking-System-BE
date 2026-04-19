import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity/movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private movieRepo: Repository<MovieEntity>,
    ) {}

    async create(data: Partial<MovieEntity>) {
        const movie = this.movieRepo.create(data);
        return this.movieRepo.save(movie);
    }

    async findAll() {
        return this.movieRepo.find({
        order: { created_at: 'DESC' },
        });
    }

    async findOne(id: string) {
        const movie = await this.movieRepo.findOne({
            where: { id },
            relations: ['showtimes', 'showtimes.room'],
        });

        if (!movie) throw new NotFoundException('Movie not found');
        return movie;
    }

    async update(id: string, data: Partial<MovieEntity>) {
        await this.movieRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        return this.movieRepo.delete(id);
    }

    async searchByName(name: string) {
    return this.movieRepo
        .createQueryBuilder('movie')
        .where('LOWER(movie.title) LIKE LOWER(:name)', {
        name: `%${name}%`,
        })
        .getMany();
    }
}
