import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "PenaltiFoiPix";

interface LoginUser {
  id: number;
  email: string;
  password: string;
  nome: string;
}

export class AuthController {
  private users: LoginUser[] = [];

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({ token });
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, nome } = req.body;

    if (!email || !password || !nome) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const isEmailValid = this.users.find((u) => u.email === email);
    if (isEmailValid) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser: LoginUser = {
      id: this.users.length + 1,
      nome,
      email,
      password: hashedPassword,
    };

    this.users.push(newUser);

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  }
}
