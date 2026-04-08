import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = router({
  login: publicProcedure
    .input(LoginSchema)
    .mutation(({ ctx, input }) => ctx.authService.login(input.email, input.password)),
});
