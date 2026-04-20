// order.dto.ts
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { OrderStatus } from 'generated/prisma/enums';

export const OrderStatusEnum = z.nativeEnum(OrderStatus);
export type OrderStatusType = z.infer<typeof OrderStatusEnum>;

export const CreateOrderSchema = z.object({
  paymentId: z
    .string()
    .uuid('Payment ID must be a valid UUID')
    .optional()
    .nullable(),
  status: OrderStatusEnum.default(OrderStatus.PENDING),
  amount: z
    .number()
    .int('Amount must be integer')
    .min(0, 'Amount must be greater than or equal to 0')
    .max(9999999, 'Amount must not exceed 9,999,999')
    .default(0),
  userId: z.string().uuid('User ID must be a valid UUID'),
  productIds: z
    .array(z.string().uuid('Product ID must be a valid UUID'))
    .min(1, 'At least one product is required'),
});

export const UpdateOrderSchema = CreateOrderSchema.partial();

export const OrderResponseSchema = z.object({
  id: z.string().uuid(),
  paymentId: z.string().uuid().nullable().optional(),
  status: OrderStatusEnum,
  amount: z.number().int().min(0),
  userId: z.string().uuid(),
  products: z
    .array(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        price: z.number().int(),
        description: z.string(),
      }),
    )
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
export class UpdateOrderDto extends createZodDto(UpdateOrderSchema) {}
export class OrderResponseDto extends createZodDto(OrderResponseSchema) {}
