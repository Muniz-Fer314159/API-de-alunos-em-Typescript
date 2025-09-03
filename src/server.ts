import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import alunoRouter from "./routes/alunoRoutes";
import { authMiddleware } from "./middleware/auth";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/aluno", alunoRouter);
app.use("/auth", authMiddleware)

const port = 3000;
app.listen(port, () => {
    console.log("Servidor de API rodando");
});