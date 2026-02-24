import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Wallet, CircleUserRound, Megaphone, Users, BarChart3 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav() {
    const { cartCount } = useCart();
    const { user } = useAuth();
    const { t } = useLanguage();
    const location = useLocation();

    if (location.pathname.startsWith('/course/')) return null;

    const isAdmin = user?.role === 'admin';

    const userNav = [
        { to: '/', icon: Home, label: t('home') },
        { to: '/cart', icon: ShoppingCart, label: t('cart'), badge: cartCount },
        { to: '/wallet', icon: Wallet, label: t('wallet') },
        { to: '/profile', icon: CircleUserRound, label: t('myAccount') },
    ];

    const adminNav = [
        { to: '/', icon: Home, label: t('home') },
        { to: '/admin/ads', icon: Megaphone, label: t('ads') },
        { to: '/admin/sales', icon: BarChart3, label: t('sales') },
        { to: '/profile', icon: CircleUserRound, label: t('myAccount') },
    ];

    const navItems = isAdmin ? adminNav : userNav;

    return (
        <nav className="bottom-nav">
            {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                    <NavLink key={item.to} to={item.to} className={`nav-item ${isActive ? 'active' : ''}`}>
                        <div className="nav-icon-wrap">
                            <Icon size={22} strokeWidth={isActive ? 2.2 : 1.5} />
                            {item.badge > 0 && (
                                <span className="nav-badge">{item.badge}</span>
                            )}
                        </div>
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
}
