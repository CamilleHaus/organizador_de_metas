import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

// Para garantir que a variável de ambiente existe, se não dá erro
