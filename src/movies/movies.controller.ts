import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MovieService } from './movies.service';
import { Query } from '@nestjs/common';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search')
  search(@Query('name') name: string) {
    return this.movieService.searchByName(name);
  }
  
  @Post()
  create(@Body() body: any) {
    return this.movieService.create(body);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.movieService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
