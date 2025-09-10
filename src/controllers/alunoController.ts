import { Request, Response } from "express";
import { AlunoService } from "../services/AlunoService";

interface Aluno {
    ra: string,
    nome: string,
    email: string
}

export class AlunoController {
    private alunoService: AlunoService;

    constructor() {
        this.alunoService = new AlunoService();
    }

    async get(req: Request, res: Response): Promise<Response> {
        const alunos = await this.alunoService.findAll();
        try {
            const alunos = await this.alunoService.findAll();
            return res.status(200).json(alunos);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar alunos' });
        }
    }

    async create(req: Request, res: Response) : Promise<Response> {
       try{
         const { ra, name, mail } = req.body;
        const novoAluno = await this.alunoService.create({
            ra, 
            nome: name, 
            email: mail 
        });
        return res.status(201).json(novoAluno);
    } catch (error) {
        return res.status(400).json({ message: Error });
    }
       }

    //update(req: Request, res: Response): Response {
        //const ra = req.params.ra;
        //const {name, mail} = req.body;

        //const alunoIndex = this.alunos.findIndex(a => a.ra === ra);        

        //if (alunoIndex > -1) {
            //this.alunos[alunoIndex] = {ra:ra, nome:name, email:mail};
        //} else {
           // return res.status(404).json({"message": "Aluno não encontrado"})
        //}

        //return res.status(200).json(this.alunos[alunoIndex]);
    //}
    
    async delete(req: Request, res: Response): Promise<Response> {
        const ra = req.params.ra;
        try {
            const deleted = await this.alunoService.delete(ra);
            if (deleted) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ "message": "Aluno não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar aluno' });
        }
    }
}