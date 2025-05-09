import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../base.entity';
import { Version } from '../../versions/entities/version.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Service extends CommonEntity {
  @Column()
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Version, (version) => version.service, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  versions: Version[];

  @ManyToOne(() => User, (user) => user.services)
  user: User;

  constructor(
    name: string,
    description: string,
    versions: Version[],
    user: User,
  ) {
    super();
    this.name = name;
    this.description = description;
    this.versions = versions;
    this.user = user;
  }
}
