import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ShowtimeService } from './showtimes.service';

@Controller('showtimes')
export class ShowtimeController {
    constructor(private readonly service: ShowtimeService) {}

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('movie/:movieId')
    findByMovie(@Param('movieId') movieId: string) {
        return this.service.findByMovie(movieId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

    @Post(':id/reset')
    resetShowtime(@Param('id') id: string) {
        return this.service.resetSeatsByShowtime(id);
    }
}