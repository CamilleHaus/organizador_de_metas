import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";

// o * centraliza todos as variaveis dentro do arquivo schema em uma unica variavel

export const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema, logger: true });

// Esse arquivo serve para fazer a conexão do db com o seed
