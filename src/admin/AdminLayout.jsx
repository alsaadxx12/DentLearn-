import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell, Globe } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './admin.css';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const { t, toggleLanguage, lang, isRTL } = useLanguage();

    return (
        <div className="admin-layout">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="admin-main" style={{ [isRTL ? 'marginRight' : 'marginLeft']: 260 }}>
                {/* Header */}
                <header className="admin-header">
                    <div className="admin-header-right">
                        <button
                            className="admin-header-btn admin-sidebar-toggle"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="admin-header-title">{t('adminPanel')}</h1>
                    </div>

                    <div className="admin-header-left">
                        <button className="admin-header-btn" onClick={toggleLanguage} title={lang === 'ar' ? 'English' : 'العربية'}>
                            <Globe size={18} />
                        </button>
                        <button className="admin-header-btn">
                            <Bell size={18} />
                        </button>
                        <div className="admin-header-user">
                            <div className="admin-header-avatar">
                                {user?.email?.charAt(0)?.toUpperCase() || 'A'}
                            </div>
                            <div className="admin-header-user-info">
                                <span>{t('admin')}</span>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
