import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { UsuarioAttributes } from '../models/Usuario';

const JWT_SECRET = process.env.JWT_SECRET || 'PenaltiFoiPix';

export class AuthService {
  private userRepository: UsuarioRepository;

  constructor() {
    this.userRepository = new UsuarioRepository();
  }

  async register(userData: Omit<UsuarioAttributes, 'id'>) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(userData.senha, 10);
    const user = await this.userRepository.create({
      ...userData,
      senha: hashedPassword
    });

    return { message: 'Usuário criado com sucesso' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, user.senha);
    if (!isValidPassword) {
      throw new Error('Acesso não autorizado');
    }

    const token = jwt.sign(
      { userId: user.id, userName: user.nome },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token };
  }
}