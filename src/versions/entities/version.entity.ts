import { Entity, ManyToOne, Column } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { CommonEntity } from '../../base.entity';

@Entity()
export class Version extends CommonEntity {
  @ManyToOne(() => Service, (service) => service.versions)
  service: Service;

  @Column()
  versionNumber: string;

  @Column({ default: false })
  isActive: boolean;

  constructor(versionNumber: string, isActive: boolean, service: Service) {
    super();
    this.versionNumber = versionNumber;
    this.isActive = isActive;
    this.service = service;
  }
}
