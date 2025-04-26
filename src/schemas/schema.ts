import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    age: z.coerce.number().min(18, { message: 'Age is required' }),
    id: z.string().optional(),
})

export type UserFormValues = z.infer<typeof userSchema>;