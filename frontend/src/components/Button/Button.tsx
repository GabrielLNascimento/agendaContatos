import { Link } from 'react-router-dom';
import { type ReactNode } from 'react';
import './Button.css';

interface ButtonData {
    titulo: ReactNode;
    className: string;
    to?: string;
    onClick?: () => void 
}

const Botao = ({ titulo, to, className, onClick }: ButtonData) => {
    return to ? (
        <Link to={to}>
            <button className={className}>{titulo}</button>
        </Link>
    ) : (
        <button className={className} onClick={onClick}>{titulo}</button>
    );
};

export default Botao;
