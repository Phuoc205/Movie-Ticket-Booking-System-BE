import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('voucher')
export class VoucherEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  code!: string;

  @Column({ type: 'int' })
  discount!: number;

  @Column({ nullable: true })
  expired_at!: Date;

  @Column({ type: 'int', default: 0})
  used!: number;

  @Column({ type: 'int', nullable: true })
  quantity!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}