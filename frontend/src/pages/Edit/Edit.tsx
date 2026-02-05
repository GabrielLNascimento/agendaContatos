import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findContatoId, updateContato } from '../../services/api';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        idade: '',
    });

    const [loading, setLoading] = useState(true);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return

        try {
            await updateContato({
                nome: formData.nome,
                email: formData.email,
                telefone: Number(formData.telefone),
                idade: Number(formData.idade)
            }, id)

            alert("Contato atualizado!")
            navigate('/');
        } catch (error) {
            console.error('Erro ao atualizar contato:', error);
        }
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
        <div className="container-create">
            <div className="card-create">
                <h2>Editar Contato</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Idade</label>
                        <input
                            type="number"
                            name="idade"
                            value={formData.idade}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="button-group">
                        <button className="button-submit" type="submit">
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
