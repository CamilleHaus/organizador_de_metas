import dayjs from "dayjs";
import { client, db } from ".";
import { goals, goalsCompletions } from "./schema";

async function seed() {
  await db.delete(goalsCompletions);
  await db.delete(goals);

  // Aqui serve para tudo que estiver no banco se deletado antes do seed agir novamente. A ordem importa

  const result = await db
    .insert(goals)
    .values([
      { title: "Acordar cedo", desiredWeeklyFrequency: 5 },
      { title: "Me exercitar", desiredWeeklyFrequency: 3 },
      { title: "Meditar", desiredWeeklyFrequency: 1 },
    ])
    .returning();

  const startOfWeek = dayjs().startOf("week");

  // Aqui estamos setando o inicio da semana sempre para o domingo, assim podemos manipular os dias mais facilmente abaixo

  await db.insert(goalsCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, "day").toDate() },
  ]);
}

seed().finally(() => {
  client.end();
});

// Aqui encerramos o db após a finalização do seed
