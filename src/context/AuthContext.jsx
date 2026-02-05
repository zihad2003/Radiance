import { createContext, useContext, useEffect, useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuthStore } from '../store/useAuthStore';
import { useToast } from './ToastContextBase';
import { AuthError, logError, getErrorMessage } from '../utils/errors';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user, token, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore();
    const loginAction = useAction(api.auth.login);
    const registerAction = useAction(api.auth.register);
    const refreshTokenAction = useAction(api.auth.refreshToken);
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    // --- PERIODIC REFRESH ---
    useEffect(() => {
        if (!token) return;

        const refreshInterval = setInterval(async () => {
            try {
                const data = await refreshTokenAction({ token });
                if (data && data.token) {
                    setAuth(user, data.token);
                    // console.log("Token refreshed successfully");
                }
            } catch (err) {
                logError(err, 'Token Refresh');
                // If token is invalid, we might want to logout, but avoid abrupt logout if it's just a network blip
            }
        }, 1000 * 60 * 60); // Refresh every 1 hour

        return () => clearInterval(refreshInterval);
    }, [token, user, setAuth, refreshTokenAction]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await loginAction({ email, password });
            setAuth(data.user, data.token);
            toast.success(`Welcome back, ${data.user.name || 'Beautiful'}! ✨`);
            return data;
        } catch (err) {
            logError(err, 'Login');
            const message = getErrorMessage(err);
            toast.error(message);
            // Re-throw standardized error if component needs it
            throw new AuthError(message, err);
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, name, phone) => {
        setLoading(true);
        try {
            const data = await registerAction({ email, password, name, phone });
            // Since register returns {token, userId}, set basics
            setAuth({ email, name, phone, id: data.userId }, data.token);
            toast.success("Account created successfully! ✨");
            return data;
        } catch (err) {
            logError(err, 'Registration');
            const message = getErrorMessage(err);
            toast.error(message);
            throw new AuthError(message, err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        try {
            storeLogout();
            toast.info("Logged out successfully.");
        } catch (err) {
            logError(err, 'Logout');
            toast.error("Error during logout");
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
