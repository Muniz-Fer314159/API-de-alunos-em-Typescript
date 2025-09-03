import {Router} from "express";
import {AlunoController} from "../controllers/alunoController";
import { authMiddleware } from "../middleware/auth";

const alunoRouter = Router();
const aluno = new AlunoController();

alunoRouter.use (authMiddleware);

/**
 * @swagger
 * components:
 *  schemas:
 *    Aluno:
 *      type: object
 *      required:
 *        - ra
 *        - name
 *        - mail
 *      properties:
 *       ra:
 *         type: string
 *         description: Registro Acadêmico do aluno
 *       name:
 *         type: string
 *         description: Nome do aluno
 *       mail:
 *         type: string
 *         format: email
 *         description: E-mail do aluno
 */

/**
 * @swagger
 * /aluno:
 *  get:
 *    summary: Lista de todos os alunos
 *    tags: [Alunos]
 *    responses:
 *      200:
 *        description: Lista de alunos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Aluno'
 */

alunoRouter.get("/", (req, res) => aluno.get(req, res));

/**@swagger
 * /aluno:
 *  post:
 *    summary: Cria um novo aluno
 *    tags: [Alunos]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Aluno'
 *    responses:
 *      201:
 *        description: Aluno criado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Aluno'
 */

alunoRouter.post("/", (req, res) => aluno.create(req, res));

/**@swagger
 * /aluno/{ra}:
 *  put:
 *    summary: Atualiza um aluno existente
 *    tags: [Alunos]
 *    parameters:
 *      - in: path
 *        name: ra
 *        required: true
 *        description: Registro Acadêmico do aluno
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nome do aluno
 *                mail:
 *                  type: string
 *                  format: email
 *                  description: E-mail do aluno
 *    responses:
 *      200:
 *        description: Aluno atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Aluno'
 *      404:
 *        description: Aluno não encontrado
 */

alunoRouter.put("/:ra", (req, res) => aluno.update(req, res));
alunoRouter.delete("/:ra", (req, res) => aluno.delete(req, res));

/**@swagger
 * /aluno/{ra}:
 *  delete:
 *    summary: Deleta um aluno existente
 *    tags: [Alunos]
 *    parameters:
 *      - in: path
 *        name: ra
 *        required: true
 *        description: Registro Acadêmico do aluno
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Aluno deletado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Aluno'
 *      404:
 *        description: Aluno não encontrado
 */

export default alunoRouter;