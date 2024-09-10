import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./.migrations", // Nome da pasta nas quais as migrations serão salvas
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
