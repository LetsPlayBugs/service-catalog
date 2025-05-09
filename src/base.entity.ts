import cuid2 from "@paralleldrive/cuid2";
import { Column, PrimaryGeneratedColumn } from "typeorm";


export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor() {
    this.id = cuid2.createId();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
