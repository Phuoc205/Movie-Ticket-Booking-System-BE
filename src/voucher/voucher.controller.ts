import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VoucherService } from './voucher.service';

@Controller('vouchers')
export class VoucherController {
    constructor(private readonly service: VoucherService) {}

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Get('/code/:code')
    getVoucherbyName(@Param('code') code: string) {
        return this.service.getVoucherbyCode(code);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}