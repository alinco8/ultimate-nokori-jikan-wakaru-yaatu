import { HashRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';

export const App = () => {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path="/" element={<div>1</div>} />
            </Routes>
        </HashRouter>
    );
};
