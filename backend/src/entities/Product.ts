import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal")
  price!: number;

  @Column()
  description!: string;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @Column({ default: true })
  isActive!: boolean;
}
