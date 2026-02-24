import { useState } from 'react';
import { Store, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

// حساب المدير المُعرّف مسبقاً
const ADMIN_EMAIL = 'admin@dentlearn.com';

export default function LoginPage() {
    const { login } = useAuth();
    const { t } = useLanguage();
    const [isRegister, setIsRegister] = useState(false);
    const [role, setRole] = useState('user');

    const handleGoogleLogin = () => {
        login({
            name: '',
            email: 'user@gmail.com',
            role: 'user',
            photo: null,
        });
        requestPermissions();
    };

    const handleGoogleRegister = () => {
        login({
            name: '',
            email: 'user@gmail.com',
            role: role,
            photo: null,
        });
        requestPermissions();
    };

    const requestPermissions = () => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    localStorage.setItem('dentlearn-location', JSON.stringify({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    }));
                },
                () => { }
            );
        }
    };

    return (
        <div className="page login-page">
            <div className="login-logo">
                <span className="login-logo-icon floating">🦷</span>
                <h1 className="login-logo-title">{t('appName')}</h1>
                <p className="login-logo-subtitle">{t('appSlogan')}</p>
            </div>

            <div className="login-form">
                <h2 className="login-form-title">{isRegister ? t('registerTitle') : t('loginTitle')}</h2>
                <p className="login-form-subtitle">
                    {isRegister ? t('registerSubtitle') : t('loginSubtitle')}
                </p>



                <button type="button" className="btn-google" onClick={isRegister ? handleGoogleRegister : handleGoogleLogin}>
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    {isRegister ? t('registerWithGoogle') : t('loginWithGoogle')}
                </button>

                <p className="login-switch">
                    {isRegister ? t('haveAccount') : t('noAccount')}
                    <button type="button" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? t('loginBtn') : t('registerBtn')}
                    </button>
                </p>
            </div>
        </div>
    );
}
