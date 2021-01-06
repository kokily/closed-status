import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import User from './User';

@Entity()
class Closed extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  year!: string;

  @Column({ type: 'text' })
  month!: string;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @OneToMany((type) => User, (user) => user.closed)
  users!: User[];
}

export default Closed;
