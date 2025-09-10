import { Aluno, AlunoAttributes} from '../models/Aluno';

export class AlunoRepository {
    async findAll(): Promise<Aluno[]>{
        return Aluno.findAll();
    }

    async findByRa(ra: string): Promise<Aluno | null> {
        return await Aluno.findOne({ where: { ra }});
    }

    async create(aluno: Omit<AlunoAttributes, 'id'>): Promise<Aluno> {
        return await Aluno.create(aluno);
    }

    async delete(id:number): Promise<number> {
        return await Aluno.destroy ({ where: {id}})
    }

    //criar o método update
}