import { useState, useEffect } from 'react';
import { type Contato, getContatos } from '../../services/api.ts';

import './Home.css';

// components
import CardContact from '../../components/CardContact/CardContact.tsx';

const Home = () => {
    const [contatos, setContatos] = useState<Contato[]>([]);

    useEffect(() => {
        const fetchContatos = async () => {
            const data = await getContatos();
            setContatos(data);
        };

        fetchContatos();
    }, []);

    return (
        <div>
            <h2 className="titleHome">Meus contatos</h2>
            {contatos ? (
                contatos.map(contato => (
                    <CardContact
                        id={contato.id}
                        nome={contato.nome}
                        email={contato.email}
                        idade={contato.idade}
                        telefone={contato.telefone}
                    />
                ))
            ) : (
                <p>Sem contatos adicionados</p>
            )}
        </div>
    );
};

export default Home;
