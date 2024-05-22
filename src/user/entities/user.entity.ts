import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'jsonb', default: {
    vote: false,
    edit: false,
    add: false,
    del: false,
  } })
  authority: {
    vote: boolean,
    edit: boolean,
    add: boolean,
    del: boolean,
  };
}
