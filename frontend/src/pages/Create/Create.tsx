import { createContato } from '../../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Create.css"

const Create = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        idade: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createContato({
                nome: formData.nome,
                email: formData.email,
                telefone: Number(formData.telefone),
                idade: Number(formData.idade),
            });

            alert('Contato criado!');
            navigate('/');
        } catch (error) {
            alert('Erro ao criar contato');
            console.log('Erro ao criar usuario', error);
        }
    };

    return (
        <div className="container-create">
            <div className="card-create">
                <h2>Criar Contato</h2>

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

                    <button className="button-submit" type="submit">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
