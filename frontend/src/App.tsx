import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';

// Paginas
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import Edit from './pages/Edit/Edit'
import SendMessage from './pages/SendMessage/SendMessage'

const App = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-contato" element={<Create />}/>
                <Route path="/edit-contato/:id" element={<Edit />}/>
                <Route path="/sendmessage/:id" element={<SendMessage />}/>
            </Routes>
        </>
    );
};

export default App;
