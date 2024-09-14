import Fastify from "fastify";
import cors from "@fastify/cors";
import appRoutes from "./routes";

const app = Fastify();

// Registrar CORS
app.register(cors);

// Registrar rotas
app.register(appRoutes);

// Habilitar o suporte para parsing do body (JSON)
app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req, body: any, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (error: any) {
      done(error, undefined);
    }
  }
);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server ok.🙂");
  });
