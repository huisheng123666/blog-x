import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: '游客'
  })
  nickname!: string;

  @Column({
    default: 'https://img2.baidu.com/it/u=4274781513,153628109&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  })
  avatar!: string;

  @Column()
  introduce!: string
}

@Entity()
export class UserAuth {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => User, {
    cascade: true
  })
  @JoinColumn({
    name: 'user_id'
  })
  user!: User;

  @Column()
  identify_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;
}