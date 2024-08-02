import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/, {
      message:
        'Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, and one digit.',
    }),
});

export type LoginType = z.infer<typeof LoginSchema>;
