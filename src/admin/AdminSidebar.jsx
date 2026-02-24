import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    LayoutDashboard, PackageSearch, BookOpen, TrendingUp, Users,
    RotateCcw, MessageCircle, Settings, Megaphone, Shield,
    Smartphone, Palette, Sparkles, LogOut, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const mainNav = [
    { to: '/admin', icon: LayoutDashboard, labelKey: 'adminDashboard' },
    { to: '/admin/purchases', icon: PackageSearch, labelKey: 'adminPurchases' },
    { to: '/admin/courses', icon: BookOpen, labelKey: 'adminCourses' },
    { to: '/admin/sales', icon: TrendingUp, labelKey: 'adminSales' },
    { to: '/admin/users', icon: Users, labelKey: 'adminUsers' },
    { to: '/admin/refunds', icon: RotateCcw, labelKey: 'adminRefunds' },
    { to: '/admin/support', icon: MessageCircle, labelKey: 'adminSupport', badge: 3 },
];

const settingsNav = [
    { to: '/admin/settings/ads', icon: Megaphone, labelKey: 'adminAds' },
    { to: '/admin/settings/master', icon: Shield, labelKey: 'adminMaster' },
    { to: '/admin/settings/zaincash', icon: Smartphone, labelKey: 'adminZainCash' },
    { to: '/admin/settings/categories', icon: Palette, labelKey: 'adminCategories' },
    { to: '/admin/settings/algorithm', icon: Sparkles, labelKey: 'adminAlgorithm' },
];

export default function AdminSidebar({ isOpen, onClose }) {
    const { t } = useLanguage();
    const { logout } = useAuth();
    const location = useLocation();
    const [settingsOpen, setSettingsOpen] = useState(
        location.pathname.startsWith('/admin/settings')
    );

    return (
        <>
            {isOpen && <div className="admin-sidebar-overlay" onClick={onClose} />}
            <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
                {/* Brand */}
                <div className="admin-sidebar-brand">
                    <div className="admin-sidebar-brand-icon">🦷</div>
                    <div>
                        <h2>DentLearn</h2>
                        <p>{t('adminPanel')}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="admin-sidebar-nav">
                    <div className="admin-sidebar-section">
                        <div className="admin-sidebar-section-title">{t('adminMainMenu')}</div>
                        {mainNav.map(item => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.to;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={`admin-nav-item ${isActive ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <Icon size={18} />
                                    <span>{t(item.labelKey)}</span>
                                    {item.badge && (
                                        <span className="nav-item-badge">{item.badge}</span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* Settings */}
                    <div className="admin-sidebar-section">
                        <div className="admin-sidebar-section-title">{t('adminSettingsSection')}</div>
                        <button
                            className="admin-sidebar-settings-toggle"
                            onClick={() => setSettingsOpen(!settingsOpen)}
                        >
                            <span className="toggle-left">
                                <Settings size={18} />
                                <span>{t('adminSettings')}</span>
                            </span>
                            <ChevronDown
                                className={`toggle-arrow ${settingsOpen ? 'open' : ''}`}
                            />
                        </button>
                        <div className={`admin-settings-subnav ${settingsOpen ? 'open' : ''}`}>
                            {settingsNav.map(item => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.to;
                                return (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={`admin-nav-item ${isActive ? 'active' : ''}`}
                                        onClick={onClose}
                                    >
                                        <Icon size={16} />
                                        <span>{t(item.labelKey)}</span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                </nav>

                {/* Footer */}
                <div className="admin-sidebar-footer">
                    <button className="admin-sidebar-logout" onClick={logout}>
                        <LogOut size={18} />
                        <span>{t('logout')}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
