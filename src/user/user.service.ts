import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  findByEmail(email: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    })
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto

    const bcryptPass = await bcrypt.hash(password, 10)

    const user = { ...userData, password: bcryptPass }

    await this.prisma.user.create({
      data: user
    })

    return { ...userData, password: undefined }
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
