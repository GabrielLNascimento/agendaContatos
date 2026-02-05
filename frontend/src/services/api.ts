const API_URL =
    import.meta.env.MODE === "production"
        ? "https://agendacontatos-6j0i.onrender.com"
        : "http://localhost:5001";

export interface Contato {
    id: string;
    nome: string;
    telefone: number;
    email: string;
    idade: number;
}

export interface DataContato {
    nome: string;
    telefone: number;
    email: string;
    idade: number;
}

export const getContatos = async (): Promise<Contato[]> => {
    try {
        const response = await fetch(`${API_URL}/contatos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(
                `Erro: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (err) {
        console.error('Erro ao buscar contatos:', err);
        throw err;
    }
};

export const deleteContato = async (id: string): Promise<Contato> => {
    try {
        const response = await fetch(`${API_URL}/deletecontato/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(
                `Erro: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (err) {
        console.error('Erro ao deletar contato:', err);
        throw err;
    }
};

export const createContato = async (data: DataContato): Promise<Contato> => {
    try {
        const response = await fetch(`${API_URL}/createcontato`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(
                `Erro: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (err) {
        console.error('Erro ao criar contato:', err);
        throw err;
    }
};

export const findContatoId = async (id: string): Promise<Contato | null> => {
    try {
        const response = await fetch(`${API_URL}/contato/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(
                `Erro: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (err) {
        console.error('Erro ao buscar contato por id:', err);
        throw err;
    }
}

export const updateContato = async (data: DataContato, id: string): Promise<Contato> => {
    try {
        const response = await fetch(`${API_URL}/updatecontato/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(
                `Erro: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (err) {
        console.error('Erro ao atualizar contato:', err);
        throw err;
    }
}