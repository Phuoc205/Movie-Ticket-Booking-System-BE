import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoucherEntity } from './voucher.entity/voucher.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class VoucherService {
    constructor(
        @InjectRepository(VoucherEntity)
        private voucherRepo: Repository<VoucherEntity>,
    ) {}

    async create(data: Partial<VoucherEntity>) {
        const exists = await this.voucherRepo.findOne({
            where: { code: data.code },
        });

        if (exists) {
            throw new Error('Voucher code already exists');
        }

        const voucher = this.voucherRepo.create(data);
        return this.voucherRepo.save(voucher);
    }

    async findAll() {
        return this.voucherRepo.find();
    }

    async findOne(id: string) {
        const voucher = await this.voucherRepo.findOne({
            where: { id },
        });

        if (!voucher) throw new NotFoundException('Voucher not found');
        return voucher;
    }

    async getVoucherbyCode(code: string) {
        const voucher = await this.voucherRepo.findOne({
            where: { code: code.toUpperCase() },
        });

        if (!voucher) {
            throw new NotFoundException('Voucher không tồn tại');
        }

        if (voucher.expired_at && new Date(voucher.expired_at) < new Date()) {
            throw new BadRequestException('Voucher đã hết hạn');
        }

        if (voucher.is_active === false) {
            throw new BadRequestException('Voucher không còn hoạt động');
        }

        if (voucher.quantity !== null && voucher.used >= voucher.quantity) {
            throw new BadRequestException('Voucher đã hết lượt sử dụng');
        }

        return voucher;
    }

    async remove(id: string) {
        const voucher = await this.findOne(id);
        return this.voucherRepo.remove(voucher);
    }
}