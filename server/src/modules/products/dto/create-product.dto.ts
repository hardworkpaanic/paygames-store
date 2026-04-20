// product.dto.ts
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { ProductType } from 'generated/prisma/enums';

// Enum для ProductType

// Используем значения из Prisma enum
export const ProductTypeEnum = z.enum([
  ProductType.GAME,
  ProductType.ACCOUNT,
  ProductType.KEY,
]);
export type ProductTypeType = z.infer<typeof ProductTypeEnum>;

// Схема для loginInfo (если есть определенная структура)
export const LoginInfoSchema = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email().optional(),
  })
  .nullable();

// Основная схема продукта
export const ProductSchema = z.object({
  id: z.string().uuid().optional(), // optional для создания
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  price: z
    .number()
    .int('Price must be integer')
    .min(0, 'Price must be greater than or equal to 0')
    .max(1000000, 'Price must not exceed 1,000,000')
    .default(100),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  type: ProductTypeEnum.default('GAME'),
  fileUrl: z.string().url('Must be a valid URL').optional().default(''),
  loginInfo: z.any().nullable().optional().default(null), // Используем any для JSON
  isAvailable: z.boolean().default(true),
  sellerId: z.string().uuid('Seller ID must be a valid UUID'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Схема для создания продукта (без id, createdAt, updatedAt)
export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Схема для обновления продукта (все поля optional)
export const UpdateProductSchema = CreateProductSchema.partial();

// DTO классы
export class ProductDto extends createZodDto(ProductSchema) {}
export class CreateProductDto extends createZodDto(CreateProductSchema) {}
export class UpdateProductDto extends createZodDto(UpdateProductSchema) {}
