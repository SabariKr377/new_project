import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from 'src/scripts/common.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOrCreateUser(data, country_code: string) {
    let phone_number;
    if (data?.phone_number) {
      phone_number = data.phone_number.slice(country_code.length);
    }
    let user;
    user = await this.prisma.user.findUnique({
      where: { phone_number },
      select: {
        phone_number: true,
        email: true,
        user_id: true,
        status: true,
        role: { select: { name: true } },
      },
    });
    if (
      user?.status === UserStatus.BLOCKED ||
      user?.status === UserStatus.IN_ACTIVE
    ) {
      throw new BadRequestException('User is Blocked or Deleted');
    }
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone_number,
          country_code,
          status: UserStatus.ACTIVE,
          role: {
            connect: { role_id: await getRole(this.prisma, Roles.ROLE_USER) },
          },
        },
        select: {
          phone_number: true,
          email: true,
          user_id: true,
          role: { select: { name: true } },
        },
      });
    }
    if (!user || !user.user_id) {
      throw new Error('Failed to find or create user');
    }
    return user;
  }

  
  //   if (
  //     user?.status === UserStatus.BLOCKED ||
  //     user?.status === UserStatus.IN_ACTIVE
  //   ) {
  //     throw new BadRequestException('User is Blocked or Deleted');
  //   }
  //   if (!user) {
  //     user = await this.prisma.user.create({
  //       data: {
  //         phone_number,
  //         country_code,
  //         status: UserStatus.ACTIVE,
  //         role: {
  //           connect: { role_id: await getRole(this.prisma, Roles.ROLE_USER) },
  //         },
  //       },
  //       select: {
  //         phone_number: true,
  //         email: true,
  //         user_id: true,
  //         role: { select: { name: true } },
  //       },
  //     });
  //   }
  //   if (!user || !user.user_id) {
  //     throw new Error('Failed to find or create user');
  //   }
  //   return user;
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
