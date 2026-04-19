import { Module } from '@nestjs/common';
import { MovieController } from './movies.controller';
import { MovieService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MoviesModule {}
