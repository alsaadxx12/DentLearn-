import {
    TrendingUp, DollarSign, Users, BookOpen,
    ArrowUpRight, ArrowDownRight, ShoppingCart, Clock
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { courses } from '../../data/courses';

export default function DashboardPage() {
    const { t, isRTL } = useLanguage();

    // Mock data for prototype
    const totalSales = 12750000;
    const totalPurchases = 4200000;
    const netProfit = totalSales - totalPurchases;
    const totalUsers = 1843;
    const activeCourses = courses.length;

    const recentSales = [
        { id: 1, user: 'أحمد محمد', course: 'أساسيات تقويم الأسنان الحديث', amount: 75000, date: '2025-02-24', status: 'completed' },
        { id: 2, user: 'سارة علي', course: 'جراحة ضرس العقل', amount: 55000, date: '2025-02-24', status: 'completed' },
        { id: 3, user: 'محمد حسن', course: 'تجميل الأسنان بالبورسلين', amount: 85000, date: '2025-02-23', status: 'pending' },
        { id: 4, user: 'فاطمة كريم', course: 'علاج العصب واللبية', amount: 45000, date: '2025-02-23', status: 'completed' },
        { id: 5, user: 'علي عبدالله', course: 'زراعة الأسنان المتقدمة', amount: 95000, date: '2025-02-22', status: 'refunded' },
    ];

    const recentUsers = [
        { name: 'أحمد محمد', email: 'ahmed@gmail.com', date: '2025-02-24', purchases: 3 },
        { name: 'سارة علي', email: 'sara@gmail.com', date: '2025-02-24', purchases: 1 },
        { name: 'كرار حسين', email: 'karar@gmail.com', date: '2025-02-23', purchases: 2 },
        { name: 'هدى جاسم', email: 'huda@gmail.com', date: '2025-02-22', purchases: 0 },
    ];

    const chartData = [
        { label: 'يناير', value: 65 },
        { label: 'فبراير', value: 80 },
        { label: 'مارس', value: 45 },
        { label: 'أبريل', value: 90 },
        { label: 'مايو', value: 70 },
        { label: 'يونيو', value: 100 },
        { label: 'يوليو', value: 85 },
    ];

    const formatNum = (n) => n.toLocaleString();
    const statusMap = {
        completed: { label: t('statusCompleted'), cls: 'success' },
        pending: { label: t('statusPending'), cls: 'warning' },
        refunded: { label: t('statusRefunded'), cls: 'danger' },
    };

    return (
        <div>
            {/* Stats */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card blue">
                    <div className="admin-stat-header">
                        <div className="admin-stat-icon blue"><DollarSign size={22} /></div>
                        <span className="admin-stat-change up"><ArrowUpRight size={14} /> 12%</span>
                    </div>
                    <div className="admin-stat-value">{formatNum(totalSales)}</div>
                    <div className="admin-stat-label">{t('totalSales')} (IQD)</div>
                </div>

                <div className="admin-stat-card green">
                    <div className="admin-stat-header">
                        <div className="admin-stat-icon green"><ShoppingCart size={22} /></div>
                        <span className="admin-stat-change up"><ArrowUpRight size={14} /> 8%</span>
                    </div>
                    <div className="admin-stat-value">{formatNum(totalPurchases)}</div>
                    <div className="admin-stat-label">{t('totalPurchases')} (IQD)</div>
                </div>

                <div className="admin-stat-card purple">
                    <div className="admin-stat-header">
                        <div className="admin-stat-icon purple"><TrendingUp size={22} /></div>
                        <span className="admin-stat-change up"><ArrowUpRight size={14} /> 18%</span>
                    </div>
                    <div className="admin-stat-value">{formatNum(netProfit)}</div>
                    <div className="admin-stat-label">{t('netProfit')} (IQD)</div>
                </div>

                <div className="admin-stat-card orange">
                    <div className="admin-stat-header">
                        <div className="admin-stat-icon orange"><Users size={22} /></div>
                        <span className="admin-stat-change up"><ArrowUpRight size={14} /> 24%</span>
                    </div>
                    <div className="admin-stat-value">{formatNum(totalUsers)}</div>
                    <div className="admin-stat-label">{t('totalUsers')}</div>
                </div>
            </div>

            {/* Charts + Quick Info */}
            <div className="admin-grid-2">
                {/* Sales Chart */}
                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <h3 className="admin-panel-title">{t('salesOverview')}</h3>
                    </div>
                    <div className="admin-panel-body">
                        <div className="admin-chart-bars">
                            {chartData.map((bar, i) => (
                                <div
                                    key={i}
                                    className="admin-chart-bar"
                                    style={{ height: `${bar.value}%` }}
                                >
                                    <span className="admin-chart-bar-label">{bar.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <h3 className="admin-panel-title">{t('quickStats')}</h3>
                    </div>
                    <div className="admin-panel-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: '#64748b', fontSize: 14 }}>{t('activeCourses')}</span>
                                <span style={{ fontWeight: 700, fontSize: 18, color: '#1e293b' }}>{activeCourses}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: '#64748b', fontSize: 14 }}>{t('pendingRefunds')}</span>
                                <span style={{ fontWeight: 700, fontSize: 18, color: '#f59e0b' }}>5</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: '#64748b', fontSize: 14 }}>{t('newMessages')}</span>
                                <span style={{ fontWeight: 700, fontSize: 18, color: '#3b82f6' }}>3</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                                <span style={{ color: '#64748b', fontSize: 14 }}>{t('todaySales')}</span>
                                <span style={{ fontWeight: 700, fontSize: 18, color: '#10b981' }}>{formatNum(350000)} IQD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Sales */}
            <div className="admin-panel" style={{ marginBottom: 20 }}>
                <div className="admin-panel-header">
                    <h3 className="admin-panel-title">{t('recentSales')}</h3>
                </div>
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('userName')}</th>
                                <th>{t('courseName')}</th>
                                <th>{t('amount')}</th>
                                <th>{t('date')}</th>
                                <th>{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSales.map(sale => (
                                <tr key={sale.id}>
                                    <td>{sale.id}</td>
                                    <td style={{ fontWeight: 600 }}>{sale.user}</td>
                                    <td>{sale.course}</td>
                                    <td>{formatNum(sale.amount)} IQD</td>
                                    <td>{sale.date}</td>
                                    <td>
                                        <span className={`status-badge ${statusMap[sale.status].cls}`}>
                                            {statusMap[sale.status].label}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Users */}
            <div className="admin-panel">
                <div className="admin-panel-header">
                    <h3 className="admin-panel-title">{t('recentUsers')}</h3>
                </div>
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>{t('userName')}</th>
                                <th>{t('email')}</th>
                                <th>{t('registrationDate')}</th>
                                <th>{t('purchasesCount')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.date}</td>
                                    <td>{user.purchases}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
