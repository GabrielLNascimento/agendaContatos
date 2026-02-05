import './CardContact.css';
import Button from '../Button/Button.tsx';
import { deleteContato } from '../../services/api.ts';
import { Trash2 } from 'lucide-react';

interface DataCard {
    id: string;
    nome: string;
    email: string;
    idade: number;
    telefone: number;
}

const CardContact = ({ id, nome, email, idade, telefone }: DataCard) => {

    const handleDelete = async (id: string) => {
        try {
            await deleteContato(id);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao deletar contato:', error);
            alert('Erro ao deletar contato. Tente novamente.');
        }
    };

    return (
        <div className="card-contact">
            <div className="card-header">
                <h2>{nome}</h2>
                <div className="card-header-right">
                    <span className="idade">{idade} anos</span>
                    <Button
                        titulo={<Trash2 />}
                        className={'btn-trash'}
                        onClick={() => handleDelete(id)}
                    />
                </div>
            </div>
            <div className="card-body">
                <div className="info-left">
                    <p className="email">{email}</p>
                    <p className="telefone">{telefone}</p>
                </div>
                <div className="info-right">
                    <p className="telefone-destaque">{telefone}</p>
                </div>
            </div>
        </div>
    );
};

export default CardContact;
