import { useParams } from 'react-router-dom';
import { useEffect, useState, type ChangeEvent } from 'react';
import { findContatoId } from '../../services/api';
import TextAreaLabel from '../../components/TextAreaLabel/TextAreaLabel';
import Button from '../../components/Button/Button';
import './SendMessage.css';

const SendMessage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        idade: '',
    });

    useEffect(() => {
        const fetchContato = async () => {
            try {
                if (!id) return;
                const data = await findContatoId(id);
                if (!data) return;

                setFormData({
                    nome: data.nome || '',
                    email: data.email || '',
                    telefone: String(data.telefone) || '',
                    idade: String(data.idade) || '',
                });
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar contato:', error);
                setLoading(false);
            }
        };

        fetchContato();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim()) {
            alert('Por favor, escreva uma mensagem antes de enviar.');
            return;
        }

        if (!formData.telefone) {
            alert('Número de telefone não encontrado.');
            return;
        }

        const phoneNumber = formData.telefone
        const encodedMessage = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        setText("")
    };

    if (loading) {
        return (
            <div className="container-create">
                <div className="card-create">
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="container-sendmsg">
            <div className="header-sendmsg">
                <h1 className="title-sendmsg">
                    Enviar mensagem para {formData.nome}
                </h1>
                <span className="tel-header">{formData.telefone}</span>
            </div>

            <form className="form-sendmessage" onSubmit={handleSubmit}>
                <TextAreaLabel
                    placeholder="Escreva a mensagem aqui..."
                    onChange={handleChange}
                    value={text}
                />
                <Button titulo={'Enviar'} className="btn-sendmessage" />
            </form>
        </main>
    );
};

export default SendMessage;
