import { Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor() {
    super();
    this.id = crypto.randomUUID();
    this.createdAt = new Date(0);
    this.updatedAt = new Date(0);
  }
}
