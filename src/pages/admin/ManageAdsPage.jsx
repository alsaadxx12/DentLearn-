import { useState } from 'react';
import { Trash2, Plus, Image, ToggleLeft, ToggleRight } from 'lucide-react';

const initialAds = [
    { id: 1, title: 'خصم 40% على جميع الكورسات', subtitle: 'عرض لفترة محدودة - سجل الآن!', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=250&fit=crop', color: '#6c5ce7', active: true },
    { id: 2, title: 'كورس تقويم الأسنان الجديد', subtitle: 'مع د. أحمد الراشد - 48 درس', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=250&fit=crop', color: '#00b894', active: true },
    { id: 3, title: 'انضم كمحاضر معنا', subtitle: 'شارك خبراتك واربح من كورساتك', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=250&fit=crop', color: '#e17055', active: true },
];

export default function ManageAdsPage() {
    const [ads, setAds] = useState(initialAds);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', subtitle: '', image: '', color: '#00d4aa' });

    const toggleAd = (id) => {
        setAds(prev => prev.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad));
    };

    const deleteAd = (id) => {
        setAds(prev => prev.filter(ad => ad.id !== id));
    };

    const addAd = (e) => {
        e.preventDefault();
        if (!form.title) return;
        setAds(prev => [...prev, { ...form, id: Date.now(), active: true }]);
        setForm({ title: '', subtitle: '', image: '', color: '#00d4aa' });
        setShowForm(false);
    };

    return (
        <div className="page">
            <div className="admin-page-header">
                <h1 className="page-title">📢 إدارة الإعلانات</h1>
                <button className="btn-admin-add" onClick={() => setShowForm(!showForm)}>
                    <Plus size={16} /> إضافة
                </button>
            </div>

            {showForm && (
                <form className="admin-form" onSubmit={addAd}>
                    <div className="input-group">
                        <input placeholder="عنوان الإعلان" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <input placeholder="النص الفرعي" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <Image size={18} className="input-icon" />
                        <input placeholder="رابط الصورة" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ width: 40, padding: 0, border: 'none', cursor: 'pointer' }} />
                        <input placeholder="لون الخلفية" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
                    </div>
                    <button type="submit" className="btn-login">إضافة الإعلان</button>
                </form>
            )}

            <div className="admin-list">
                {ads.map(ad => (
                    <div key={ad.id} className={`admin-card ${!ad.active ? 'inactive' : ''}`}>
                        {ad.image && (
                            <div className="admin-card-image">
                                <img src={ad.image} alt={ad.title} />
                                <div className="admin-card-color" style={{ background: ad.color }} />
                            </div>
                        )}
                        <div className="admin-card-body">
                            <h3 className="admin-card-title">{ad.title}</h3>
                            <p className="admin-card-subtitle">{ad.subtitle}</p>
                            <div className="admin-card-actions">
                                <button className="admin-toggle" onClick={() => toggleAd(ad.id)}>
                                    {ad.active ? <ToggleRight size={24} style={{ color: 'var(--primary)' }} /> : <ToggleLeft size={24} />}
                                    <span>{ad.active ? 'مفعل' : 'معطل'}</span>
                                </button>
                                <button className="admin-delete" onClick={() => deleteAd(ad.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {ads.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">📢</div>
                    <h3 className="empty-state-title">لا توجد إعلانات</h3>
                    <p className="empty-state-text">أضف إعلاناً جديداً للظهور في الصفحة الرئيسية</p>
                </div>
            )}
        </div>
    );
}
