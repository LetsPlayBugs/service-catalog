
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Services extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
  
  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
  }
}
