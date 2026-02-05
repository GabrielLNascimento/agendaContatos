import './Navbar.css';
import Button from '../Button/Button.tsx';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-title">
                    <Link to={"/"} className='link-title'>
                        <Users size={42} />
                    </Link>
                </h1>
                <Button
                    titulo={'Adicionar Contatos'}
                    to={'/add-contato'}
                    className={'btn-add'}
                />
            </div>
        </nav>
    );
};

export default Navbar;
