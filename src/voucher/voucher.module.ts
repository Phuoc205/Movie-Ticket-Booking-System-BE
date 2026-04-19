import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherEntity } from './voucher.entity/voucher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoucherEntity]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService]
})
export class VoucherModule {}
