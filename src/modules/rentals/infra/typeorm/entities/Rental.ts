import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
    id: string;
  @Column()
    car_id: string;
  @Column()
    user_id: string;
  @CreateDateColumn()
    start_date: Date;
  @Column()
    end_date: Date;
  @Column()
    expect_end_date: Date;
  @Column()
    total: number;
  @CreateDateColumn()
    created_at: Date;
  @UpdateDateColumn()
    updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Rental };
