import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, CreditCard, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartPage() {
    const { items, removeFromCart, getTotal, clearCart } = useCart();
    const { t } = useLanguage();

    if (items.length === 0) {
        return (
            <div className="page">
                <h1 className="page-title">{t('shoppingCart')}</h1>
                <div className="empty-state">
                    <div className="empty-state-icon">🛒</div>
                    <h3 className="empty-state-title">{t('emptyCart')}</h3>
                    <p className="empty-state-text">{t('noCoursesAdded')}</p>
                    <Link to="/courses" className="btn-browse">
                        <BookOpen size={16} />
                        {t('browseCourses')}
                    </Link>
                </div>
            </div>
        );
    }

    const total = getTotal();
    const discount = items.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

    return (
        <div className="page">
            <h1 className="page-title">{t('shoppingCart')}</h1>

            {items.map(item => (
                <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-item-info">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-instructor">{item.instructor}</p>
                        <div className="cart-item-bottom">
                            <span className="cart-item-price">{item.price.toLocaleString()} {t('currency')}</span>
                            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="cart-summary">
                <div className="cart-summary-row">
                    <span>{t('numCourses')}</span>
                    <span>{items.length} {t('course')}</span>
                </div>
                <div className="cart-summary-row">
                    <span>{t('subtotal')}</span>
                    <span>{(total + discount).toLocaleString()} {t('currency')}</span>
                </div>
                {discount > 0 && (
                    <div className="cart-summary-row" style={{ color: 'var(--accent)' }}>
                        <span>{t('discount')}</span>
                        <span>-{discount.toLocaleString()} {t('currency')}</span>
                    </div>
                )}
                <div className="cart-summary-row total">
                    <span>{t('total')}</span>
                    <span>{total.toLocaleString()} {t('currency')}</span>
                </div>
                <button className="btn-checkout" onClick={() => alert(t('goToPayment'))}>
                    <CreditCard size={18} />
                    {t('checkout')}
                </button>
            </div>
        </div>
    );
}
