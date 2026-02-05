import { type Request, type Response } from 'express';
import * as ContatoModel from '../models/contatoModel.js';

export const listContatos = async (req: Request, res: Response) => {
    try {
        const contatos = await ContatoModel.findAll();
        console.log(contatos);
        res.json(contatos);
    } catch (err) {
        console.error('Erro ao listar contatos:', err);
        res.status(500).json({ error: 'Erro ao listar contatos' });
    }
};

export const createContato = async (req: Request, res: Response) => {
    try {
        const { email, nome, idade, telefone } = req.body;

        if (!email || !nome || !idade || !telefone) {
            res.status(400).json({ error: 'Campos são obrigatórios' });
            return;
        }

        const contato = await ContatoModel.create({
            email,
            nome,
            idade,
            telefone,
        });

        res.status(201).json(contato);
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).json({ error: 'Erro ao criar usuários' });
    }
};

export const updateContato = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, nome, idade, telefone } = req.body;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                message: 'ID inválido',
            });
        }

        const newContato = await ContatoModel.update(
            { email, nome, idade, telefone },
            id
        );
        res.status(201).json(newContato);
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const deleteContato = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                message: 'ID inválido',
            });
        }

        const contato = await ContatoModel.deleteCont(id);

        res.status(201).json({ message: 'Contato deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ error: 'Erro ao deletar usuários' });
    }
};
