import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import Closed from './Closed';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'jsonb', nullable: true })
  closed_date!: string[] | null;

  @Column({ nullable: true })
  closedId!: string;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne((type) => Closed, (closed) => closed.users, {
    onDelete: 'CASCADE',
  })
  closed!: Closed;
}

export default User;
