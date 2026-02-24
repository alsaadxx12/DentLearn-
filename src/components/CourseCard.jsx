import { Link } from 'react-router-dom';
import { Star, TrendingUp, Users, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';

export default function CourseCard({ course }) {
    const { addToCart, isInCart } = useCart();
    const { t } = useLanguage();
    const inCart = isInCart(course.id);
    const discount = Math.round((1 - course.price / course.originalPrice) * 100);
    const cat = categories.find(c => c.id === course.category);

    const handleCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!inCart) addToCart(course);
    };

    return (
        <Link to={`/course/${course.id}`} className="course-card">
            <div className="course-card-image">
                <img src={course.image} alt={course.title} loading="lazy" />
                {course.bestseller && <span className="course-card-badge">{t('bestseller')}</span>}
                {discount > 0 && <span className="course-card-discount">-{discount}%</span>}
            </div>
            <div className="course-card-body">
                {cat && <div className="course-card-category">{cat.icon} {cat.name}</div>}
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-instructor">{course.instructor}</p>
                <div className="course-card-meta">
                    <span className="course-card-rating">
                        <Star size={14} fill="#fdcb6e" stroke="#fdcb6e" />
                        {course.rating}
                    </span>
                    <span className="course-card-meta-item">
                        <TrendingUp size={14} /> {course.students.toLocaleString()} {t('sold')}
                    </span>
                </div>
                <div className="course-card-footer">
                    <div className="course-card-price-group">
                        <span className="course-card-price">{course.price.toLocaleString()}</span>
                        <span className="course-card-price-currency"> {t('currency')}</span>
                        {course.originalPrice > course.price && (
                            <span className="course-card-price-original">{course.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    <button className={`btn-add-cart ${inCart ? 'in-cart' : ''}`} onClick={handleCartClick}>
                        {inCart ? <><Check size={14} /> {t('inCart')}</> : <><ShoppingCart size={14} /> {t('addToCart')}</>}
                    </button>
                </div>
            </div>
        </Link>
    );
}
