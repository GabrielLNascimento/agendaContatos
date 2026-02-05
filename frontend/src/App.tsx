import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';

// Paginas
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';

const App = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-contato" element={<Create />}/>
            </Routes>
        </>
    );
};

export default App;
