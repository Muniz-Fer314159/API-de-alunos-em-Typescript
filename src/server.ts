import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import alunoRouter from "./routes/alunoRoutes";
import authRouter from "./routes/authRoutes";

const app = express();
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/aluno", alunoRouter);
app.use("/auth", authRouter);

const port = 3000;
app.listen(port, () => {
  console.log("Servidor de API rodando em http://localhost:" + port);
});
export default app;