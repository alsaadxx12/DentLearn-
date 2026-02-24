import { TrendingUp, DollarSign, ShoppingBag, Users, BarChart3 } from 'lucide-react';

const recentSales = [
    { id: 1, course: 'فن تجميل الأسنان', buyer: 'أحمد علي', seller: 'د. محمد العبيدي', price: 95000, date: '2026-02-24' },
    { id: 2, course: 'تقويم الأسنان الحديث', buyer: 'سارة حسن', seller: 'د. أحمد الراشد', price: 75000, date: '2026-02-24' },
    { id: 3, course: 'جراحة ضرس العقل', buyer: 'محمد كريم', seller: 'د. سارة المالكي', price: 55000, date: '2026-02-23' },
    { id: 4, course: 'علاج قنوات الجذور', buyer: 'فاطمة نور', seller: 'د. علي الشمري', price: 85000, date: '2026-02-23' },
    { id: 5, course: 'أسنان الأطفال', buyer: 'عمر سعد', seller: 'د. نور الدين الجبوري', price: 45000, date: '2026-02-22' },
];

export default function SalesDashboardPage() {
    const totalRevenue = 14660000;
    const totalSales = 184;
    const activeSellers = 5;
    const activeUsers = 1250;

    return (
        <div className="page">
            <h1 className="page-title">📊 لوحة المبيعات</h1>

            <div className="dashboard-stats">
                <div className="dash-stat-card revenue">
                    <div className="dash-stat-icon"><DollarSign size={20} /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{(totalRevenue / 1000000).toFixed(1)}M</span>
                        <span className="dash-stat-label">إجمالي الإيرادات</span>
                    </div>
                    <span className="dash-stat-trend up"><TrendingUp size={14} /> 12%</span>
                </div>
                <div className="dash-stat-card sales">
                    <div className="dash-stat-icon"><ShoppingBag size={20} /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{totalSales}</span>
                        <span className="dash-stat-label">عمليات البيع</span>
                    </div>
                    <span className="dash-stat-trend up"><TrendingUp size={14} /> 8%</span>
                </div>
                <div className="dash-stat-card sellers">
                    <div className="dash-stat-icon"><Users size={20} /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{activeSellers}</span>
                        <span className="dash-stat-label">بائعون نشطون</span>
                    </div>
                </div>
                <div className="dash-stat-card users">
                    <div className="dash-stat-icon"><BarChart3 size={20} /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{activeUsers.toLocaleString()}</span>
                        <span className="dash-stat-label">مستخدمون</span>
                    </div>
                    <span className="dash-stat-trend up"><TrendingUp size={14} /> 15%</span>
                </div>
            </div>

            <div className="section-header" style={{ marginTop: 24 }}>
                <h2 className="section-title">آخر المبيعات</h2>
            </div>

            <div className="admin-list">
                {recentSales.map(sale => (
                    <div key={sale.id} className="sale-item">
                        <div className="sale-info">
                            <h4>{sale.course}</h4>
                            <p>المشتري: {sale.buyer} • البائع: {sale.seller}</p>
                            <span className="sale-date">{sale.date}</span>
                        </div>
                        <span className="sale-price">{sale.price.toLocaleString()} د.ع</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
