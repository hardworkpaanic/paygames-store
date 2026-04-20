import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      throw new BadGatewayException(`Failed to create product: ${error}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new BadGatewayException(`Failed to fetch products: ${error}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new BadGatewayException(`Failed to fetch product: ${error}`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new BadGatewayException(`Failed to update product: ${error}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadGatewayException(`Failed to delete product: ${error}`);
    }
  }
}
