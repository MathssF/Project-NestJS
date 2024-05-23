import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from './genres.entity';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  release_date: string;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable()
  genres: Genre[];
}
