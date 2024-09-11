import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { goals, goalsCompletions } from "../db/schema";
import { and, sql, lte, count, gte } from "drizzle-orm";

dayjs.extend(weekOfYear);

export function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );

  // Aqui estamos selecionando todas as metas na qual a data de criação seja igual ou menor ao último dia dessa semana

  const goalCompletionCounts = db.$with("goal_completion_counts").as(
    db
      .select({
        goalId: goalsCompletions.goalId,
        completionCount: count(goalsCompletions.id),
      })
      .from(goalsCompletions)
      .where(
        and(
          lte(goals.createdAt, lastDayOfWeek),
          gte(goals.createdAt, firstDayOfWeek)
        )
      )
      .groupBy(goalsCompletions.goalId)
  );

  // Aqui estamos buscando apenas as metas de uma semana especifica e agrupando elas pelo id da meta, e calculando quantas
  // vezes aquela meta foi concluída
}
