import { db } from "../db";
import { goals } from "../db/schema";

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGol({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning();

  // Por padrão, o insert não retorna nada, por isso precisamos colocar o returning. É sempre um array que é retornado

  const goal = result[0];

  return {
    goal,
  };
}
