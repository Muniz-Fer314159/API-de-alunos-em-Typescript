import {AlunoRepository} from '../repositories/AlunoRepository';
import {Aluno, AlunoAttributes} from '../models/Aluno';

export class AlunoService {
    private alunoRepository: AlunoRepository;

    constructor() {
        this.alunoRepository = new AlunoRepository();
    }
    async findAll() {
        return await this.alunoRepository.findAll();
    }
    async create (aluno: Omit<AlunoAttributes, 'id'>) {
        const alunoExistente = await this.alunoRepository.findByRa(aluno.ra);
        if (alunoExistente) {
            throw new Error('RA ja cadastrado');
        }
       
        return await this.alunoRepository.create(aluno);
    }
     async delete(ra: string): Promise<boolean> {
            const aluno = await this.alunoRepository.findByRa(ra);
            if (!aluno) {
                return false;
            }
            const deletedCount = await this.alunoRepository.delete(aluno.id);
            return deletedCount > 0;
        }

}
