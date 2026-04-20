import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  balance: z.number().int().min(0, 'Balance cannot be negative').default(0),
});

export const UpdateUserDto = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .optional(),
  balance: z.number().int().min(0, 'Balance cannot be negative').optional(),
});

export const UserSchema = z.object({
  id: z.string().uuid('Invalid UUID'),
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  balance: z.number().int().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
  products: z.array(z.any()).optional(),
  orders: z.array(z.any()).optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
export type UserDto = z.infer<typeof UserSchema>;
