import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/authProvider';
import rotas from './rotas';

function Rotas(){
    return (
        <AuthProvider>
          <BrowserRouter>
            <Routes>
                {rotas}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      );
} export default Rotas;