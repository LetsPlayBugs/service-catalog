import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from '../../base.entity';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Service, (service) => service.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  services: Service[];

  constructor(email: string, password: string, services: Service[]) {
    super();
    this.email = email;
    this.password = password;
    this.services = services;
  }
}
