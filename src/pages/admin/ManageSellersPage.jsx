import { useState } from 'react';
import { Search, Ban, CheckCircle, Eye } from 'lucide-react';

const initialSellers = [
    { id: 1, name: 'د. أحمد الراشد', email: 'ahmed@dent.com', courses: 3, sales: 45, revenue: 3375000, status: 'active' },
    { id: 2, name: 'د. سارة المالكي', email: 'sara@dent.com', courses: 2, sales: 32, revenue: 1760000, status: 'active' },
    { id: 3, name: 'د. محمد العبيدي', email: 'mohammed@dent.com', courses: 4, sales: 67, revenue: 6365000, status: 'active' },
    { id: 4, name: 'د. فاطمة الحسيني', email: 'fatima@dent.com', courses: 1, sales: 12, revenue: 780000, status: 'active' },
    { id: 5, name: 'د. علي الشمري', email: 'ali@dent.com', courses: 2, sales: 28, revenue: 2380000, status: 'suspended' },
];

export default function ManageSellersPage() {
    const [sellers, setSellers] = useState(initialSellers);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleStatus = (id) => {
        setSellers(prev => prev.map(s =>
            s.id === id ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : s
        ));
    };

    const filtered = sellers.filter(s =>
        s.name.includes(searchTerm) || s.email.includes(searchTerm)
    );

    const totalRevenue = sellers.reduce((sum, s) => sum + s.revenue, 0);
    const totalSales = sellers.reduce((sum, s) => sum + s.sales, 0);

    return (
        <div className="page">
            <h1 className="page-title">👥 إدارة البائعين</h1>

            <div className="stats-grid" style={{ marginBottom: 16 }}>
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-value">{sellers.length}</div>
                    <div className="stat-label">بائع</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-value">{totalSales}</div>
                    <div className="stat-label">مبيعة</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">{(totalRevenue / 1000000).toFixed(1)}M</div>
                    <div className="stat-label">إيرادات</div>
                </div>
            </div>

            <div className="search-bar" style={{ marginBottom: 16 }}>
                <Search size={18} />
                <input placeholder="ابحث عن بائع..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            <div className="admin-list">
                {filtered.map(seller => (
                    <div key={seller.id} className={`admin-card seller-card ${seller.status === 'suspended' ? 'inactive' : ''}`}>
                        <div className="admin-card-body">
                            <div className="seller-header">
                                <div className="seller-avatar">{seller.name.charAt(3)}</div>
                                <div className="seller-info">
                                    <h3 className="admin-card-title">{seller.name}</h3>
                                    <p className="admin-card-subtitle">{seller.email}</p>
                                </div>
                                <span className={`seller-status ${seller.status}`}>
                                    {seller.status === 'active' ? 'نشط' : 'موقوف'}
                                </span>
                            </div>
                            <div className="seller-stats">
                                <span>📚 {seller.courses} كورس</span>
                                <span>📦 {seller.sales} مبيعة</span>
                                <span>💰 {seller.revenue.toLocaleString()} د.ع</span>
                            </div>
                            <div className="admin-card-actions">
                                <button className="admin-action-btn" onClick={() => toggleStatus(seller.id)}>
                                    {seller.status === 'active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                                    {seller.status === 'active' ? 'إيقاف' : 'تفعيل'}
                                </button>
                                <button className="admin-action-btn view">
                                    <Eye size={16} /> تفاصيل
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
