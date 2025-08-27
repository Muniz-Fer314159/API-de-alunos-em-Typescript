import { Request, Response } from "express";

interface Aluno {
    ra: string,
    nome: string,
    email: string
}

export class AlunoController {
    private alunos: Aluno[] = [
        {
            ra: "123", 
            nome: "fulano", 
            email: "fulado@teste.com"
        }
    ];
    
    get(req: Request, res: Response): Response {
        return res.json(this.alunos);
    }

    create(req: Request, res: Response) : Response {
        const { ra, name, mail } = req.body;
        const novoAluno: Aluno = {
            ra:ra,
            nome:name,
            email:mail 
        };
        this.alunos.push(novoAluno);
        return res.status(201).json(novoAluno);
    }

    update(req: Request, res: Response): Response {
        const ra = req.params.ra;
        const {name, mail} = req.body;

        const alunoIndex = this.alunos.findIndex(a => a.ra === ra);        

        if (alunoIndex > -1) {
            this.alunos[alunoIndex] = {ra:ra, nome:name, email:mail};
        } else {
            return res.status(404).json({"message": "Aluno não encontrado"})
        }

        return res.status(200).json(this.alunos[alunoIndex]);
    }
    
    delete(req: Request, res: Response): Response {
        const ra = req.params.ra;

        const alunoIndex = this.alunos.findIndex(a => a.ra === ra);

        if (alunoIndex > -1) {
            this.alunos.splice(alunoIndex, 1);
            return res.status(204).send();
        } else {
            return res.status(404).json({"message": "Aluno não encontrado"})
        }
    }
}