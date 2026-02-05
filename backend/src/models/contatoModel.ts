import prisma from '../config/prisma.js';

export interface Contato {
    id: string;
    nome: string;
    email: string;
    idade: number;
    telefone: number;
}

export interface UserData {
    email: string;
    nome: string;
    idade: number;
    telefone: number;
}

export const findAll = async (): Promise<Contato[]> => {
    return await prisma.contatos.findMany();
};

export const create = async (data: UserData): Promise<Contato> => {
    return await prisma.contatos.create({ data });
};

export const update = async (data: UserData, id: string): Promise<Contato> => {
    return await prisma.contatos.update({
        where: { id },
        data
    });
};

export const deleteCont = async (id: string): Promise<Contato> => {
    return await prisma.contatos.delete({
        where: { id },
    });
};
