import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "../routes/create-goals";
import { createCompletionRoute } from "../routes/create-completion";
import { getPendingGoalsRoute } from "../routes/get-pending-goals";
import { getWeekSummaryRoute } from "../routes/get-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);

app.register(getPendingGoalsRoute);

app.register(createCompletionRoute);

app.register(getWeekSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running");
  });
