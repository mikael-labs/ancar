import { User } from 'src/core/entities';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    unique: true,
    type: 'varchar',
  })
  CPF: string;

  static fromDomain(user: User) {
    const userDB = new UserEntity();
    userDB.id = user.id;
    userDB.password = user.password;
    userDB.name = user.name;
    userDB.CPF = user.CPF;

    return userDB;
  }
}
