import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { UserEntity } from '../../user/entities/user.entity';
  import { Skill } from '../../skill/entities/skill.entity';
  
  @Entity('cvs')
  export class Cv {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    firstname: string;
  
    @Column()
    age: number;
  
    @Column()
    cin: string;
  
    @Column()
    job: string;
  
    @Column()
    path: string;
  
    @ManyToOne(() => UserEntity, (user) => user.cvs, { onDelete: 'CASCADE' })
    user: UserEntity;
  
    @ManyToMany(() => Skill, (skill) => skill.cvs, { cascade: true , nullable:true})
    @JoinTable()
    skills?: Skill[];
  }
  