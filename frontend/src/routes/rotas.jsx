import { Route, Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import Login from '../views/Login';
import Home from '../views/Home';
import Feed from '../views/Feed';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

export default [
    <Route
        path="/login"
        element={
            <PrivateRoute>
                <Login/>
            </PrivateRoute>
        }
    />,
    // <Route 
    //     path="/" 
    //     element={
    //         <PrivateRoute>
    //             <Home />
    //         </PrivateRoute>
    //     } 
    // />,
    <Route
        path="/"
        element={
            <PrivateRoute>
                <Feed/>
            </PrivateRoute>
        }
    />
]