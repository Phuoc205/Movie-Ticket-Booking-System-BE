import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { SeatService } from './seats.service';

@Controller('seats')
export class SeatController {
    constructor(private readonly service: SeatService) {}

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('/by-room/:roomId')
    getSeatsByRoom(
        @Param('roomId') roomId: string,
        @Query('showtime_id') showtimeId: string,
    ) {
        return this.service.getSeatsByRoom(roomId, showtimeId);
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
}