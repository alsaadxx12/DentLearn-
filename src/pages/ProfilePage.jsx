import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, ChevronLeft, ChevronRight, Heart, Bell, Sun, Moon, Wallet, ArrowDownLeft, ArrowUpRight, MapPin, Plus, Trash2, MessageCircle, Send, Phone, X, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const { t, lang, toggleLanguage, isRTL } = useLanguage();
    const navigate = useNavigate();

    const [showLocations, setShowLocations] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [locations, setLocations] = useState([
        { id: 1, name: isRTL ? 'المنزل' : 'Home', address: isRTL ? 'بغداد، الكرادة، شارع 52' : 'Baghdad, Karrada, St. 52' },
    ]);
    const [newLocName, setNewLocName] = useState('');
    const [newLocAddress, setNewLocAddress] = useState('');

    const [chatMessages, setChatMessages] = useState([
        { from: 'support', text: t('supportWelcome') },
    ]);
    const [chatInput, setChatInput] = useState('');

    const addLocation = () => {
        if (!newLocName.trim() || !newLocAddress.trim()) return;
        setLocations(prev => [...prev, { id: Date.now(), name: newLocName, address: newLocAddress }]);
        setNewLocName('');
        setNewLocAddress('');
    };

    const removeLocation = (id) => {
        setLocations(prev => prev.filter(l => l.id !== id));
    };

    const sendChatMessage = () => {
        if (!chatInput.trim()) return;
        setChatMessages(prev => [...prev, { from: 'user', text: chatInput }]);
        setChatInput('');
        setTimeout(() => {
            setChatMessages(prev => [...prev, { from: 'support', text: t('supportAutoReply') }]);
        }, 1200);
    };

    const Arrow = isRTL ? ChevronLeft : ChevronRight;

    return (
        <div className="page" style={{ padding: 0 }}>
            {/* Hero Section */}
            <div className="profile-hero">
                <div className="profile-hero-bg">
                    <div className="profile-hero-circle c1" />
                    <div className="profile-hero-circle c2" />
                </div>
                <div className="profile-hero-content">
                    <div className="profile-avatar-premium">
                        <span>{user?.name?.charAt(0) || (isRTL ? 'م' : 'U')}</span>
                    </div>
                    <p className="profile-hero-email">{user?.email || 'user@dentlearn.com'}</p>
                    <div className="profile-hero-phone">
                        <Phone size={14} />
                        <span>{user?.phone || '07701234567'}</span>
                    </div>
                    <span className="profile-hero-badge">{user?.role === 'seller' ? t('sellerBadge') : t('userBadge')}</span>

                    {/* Quick Actions inside hero */}
                    <div className="profile-hero-actions">
                        <button className="hero-action-btn" onClick={() => navigate('/wallet')}>
                            <Wallet size={16} />
                            <span>{t('walletAction')}</span>
                        </button>
                        <button className="hero-action-btn" onClick={() => navigate('/wallet')}>
                            <ArrowDownLeft size={16} />
                            <span>{t('deposit')}</span>
                        </button>
                        <button className="hero-action-btn" onClick={() => navigate('/wallet')}>
                            <ArrowUpRight size={16} />
                            <span>{t('withdraw')}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 16px' }}>

                {/* Menu */}
                <div className="profile-menu-premium">
                    <div className="profile-menu-item-premium" onClick={() => { }}>
                        <div className="menu-icon-wrap courses"><BookOpen size={18} /></div>
                        <span>{user?.role === 'seller' ? t('myListedCourses') : t('myPurchasedCourses')}</span>
                        <Arrow size={16} className="arrow" />
                    </div>
                    <div className="profile-menu-item-premium" onClick={() => { }}>
                        <div className="menu-icon-wrap fav"><Heart size={18} /></div>
                        <span>{t('favorites')}</span>
                        <Arrow size={16} className="arrow" />
                    </div>
                    <div className="profile-menu-item-premium" onClick={() => { }}>
                        <div className="menu-icon-wrap notif"><Bell size={18} /></div>
                        <span>{t('notifications')}</span>
                        <Arrow size={16} className="arrow" />
                    </div>
                    <div className="profile-menu-item-premium" onClick={toggleTheme}>
                        <div className="menu-icon-wrap theme">{isDark ? <Sun size={18} /> : <Moon size={18} />}</div>
                        <span>{isDark ? t('lightMode') : t('darkMode')}</span>
                        <div className="theme-toggle-switch">
                            <div className={`theme-toggle-dot ${isDark ? '' : 'light'}`} />
                        </div>
                    </div>
                    <div className="profile-menu-item-premium" onClick={toggleLanguage}>
                        <div className="menu-icon-wrap lang"><Globe size={18} /></div>
                        <span>{t('language')}: {lang === 'ar' ? 'English' : 'العربية'}</span>
                        <span className="lang-badge">{lang === 'ar' ? 'EN' : 'AR'}</span>
                    </div>
                    <div className="profile-menu-item-premium" onClick={() => setShowLocations(true)}>
                        <div className="menu-icon-wrap loc"><MapPin size={18} /></div>
                        <span>{t('savedLocations')}</span>
                        <Arrow size={16} className="arrow" />
                    </div>
                    <div className="profile-menu-item-premium" onClick={() => setShowChat(true)}>
                        <div className="menu-icon-wrap help"><MessageCircle size={18} /></div>
                        <span>{t('helpAndSupport')}</span>
                        <Arrow size={16} className="arrow" />
                    </div>
                    <div className="profile-menu-item-premium danger" onClick={logout}>
                        <div className="menu-icon-wrap logout"><LogOut size={18} /></div>
                        <span>{t('logout')}</span>
                        <Arrow size={16} className="arrow" />
                    </div>
                </div>
            </div>

            {/* ===== Saved Locations Modal ===== */}
            {showLocations && (
                <div className="modal-overlay" onClick={() => setShowLocations(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t('savedLocationsTitle')}</h3>
                            <button className="modal-close" onClick={() => setShowLocations(false)}><X size={18} /></button>
                        </div>
                        <div className="locations-list">
                            {locations.map(loc => (
                                <div key={loc.id} className="location-item">
                                    <div className="location-info">
                                        <MapPin size={16} />
                                        <div>
                                            <h4>{loc.name}</h4>
                                            <p>{loc.address}</p>
                                        </div>
                                    </div>
                                    <button className="location-delete" onClick={() => removeLocation(loc.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {locations.length === 0 && (
                                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20 }}>{t('noSavedLocations')}</p>
                            )}
                        </div>
                        <div className="location-add-form">
                            <h4>{t('addNewLocation')}</h4>
                            <input
                                type="text"
                                placeholder={t('locationName')}
                                value={newLocName}
                                onChange={(e) => setNewLocName(e.target.value)}
                                className="location-input"
                            />
                            <input
                                type="text"
                                placeholder={t('fullAddress')}
                                value={newLocAddress}
                                onChange={(e) => setNewLocAddress(e.target.value)}
                                className="location-input"
                            />
                            <button className="location-add-btn" onClick={addLocation} disabled={!newLocName.trim() || !newLocAddress.trim()}>
                                <Plus size={16} />
                                <span>{t('addLocation')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== Support Chat Modal ===== */}
            {showChat && (
                <div className="modal-overlay" onClick={() => setShowChat(false)}>
                    <div className="modal-content chat-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t('chatTitle')}</h3>
                            <button className="modal-close" onClick={() => setShowChat(false)}><X size={18} /></button>
                        </div>
                        <div className="chat-messages">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`chat-bubble ${msg.from}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chat-input-bar">
                            <input
                                type="text"
                                placeholder={t('typeMessage')}
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                                className="chat-input"
                                maxLength={100}
                            />
                            <button className="chat-send-btn" onClick={sendChatMessage} disabled={!chatInput.trim()}>
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
