import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      return this.prisma.order.create({
        data: {
          ...createOrderDto,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order', error);
    }
  }

  async findAll() {
    try {
      return this.prisma.order.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve orders',
        error,
      );
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.order.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve order', error);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return this.prisma.order.update({
        where: { id },
        data: {
          ...updateOrderDto,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order', error);
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete order', error);
    }
  }
}
