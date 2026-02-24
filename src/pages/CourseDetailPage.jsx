import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Star, Clock, BookOpen, ShoppingCart, Check, Play, FileText } from 'lucide-react';
import { courses } from '../data/courses';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const existingReviews = [
    { name: 'عمر', text: 'كورس ممتاز جداً، استفدت منه كثيراً في عملي السريري.', rating: 5 },
    { name: 'هدى', text: 'المحتوى غني ومفصل والمحاضر يشرح بطريقة واضحة ومبسطة.', rating: 5 },
    { name: 'كرار', text: 'أنصح كل طبيب أسنان بهذا الكورس، يستحق كل دينار.', rating: 4 },
];

// كلمات محظورة
const BAD_WORDS = [
    'سيء', 'غبي', 'حمار', 'كلب', 'حقير', 'تافه', 'نصاب', 'احتيال', 'نصب',
    'سرقة', 'لعنة', 'ملعون', 'خنزير', 'قذر', 'وسخ', 'زفت', 'فاشل',
    'stupid', 'shit', 'fuck', 'damn', 'idiot', 'scam', 'trash', 'garbage', 'hate', 'suck',
];

function containsBadWords(text) {
    const lower = text.toLowerCase();
    return BAD_WORDS.some(word => lower.includes(word));
}

export default function CourseDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, isInCart } = useCart();
    const { t, isRTL } = useLanguage();
    const [activeTab, setActiveTab] = useState('description');
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');
    const [hasReviewed, setHasReviewed] = useState(false);
    const [reviewError, setReviewError] = useState('');
    const [reviews, setReviews] = useState(existingReviews);
    const [showRatingPrompt, setShowRatingPrompt] = useState(false);

    const course = courses.find(c => c.id === Number(id));
    if (!course) return <div className="page"><div className="empty-state"><div className="empty-state-icon">😕</div><h3 className="empty-state-title">{t('courseNotFound')}</h3></div></div>;

    const cat = categories.find(c => c.id === course.category);
    const inCart = isInCart(course.id);
    const discount = Math.round((1 - course.price / course.originalPrice) * 100);

    // عدد الصفحات المقدّر (بدل الطلاب والدروس)
    const totalPages = course.curriculum.reduce((acc, s) => acc + s.lessons * 3, 0);

    const handleAddToCart = () => {
        if (inCart) return;
        if (!hasReviewed) {
            setShowRatingPrompt(true);
            setActiveTab('reviews');
            return;
        }
        addToCart(course);
    };

    const submitReview = () => {
        setReviewError('');

        if (userRating === 0) {
            setReviewError(t('selectStars'));
            return;
        }
        if (userReview.trim().length < 5) {
            setReviewError(t('minReviewChars'));
            return;
        }
        if (containsBadWords(userReview)) {
            setReviewError(t('useProperWords'));
            return;
        }

        setReviews(prev => [{ name: t('youLabel'), text: userReview, rating: userRating }, ...prev]);
        setHasReviewed(true);
        setShowRatingPrompt(false);
        setReviewError('');
    };

    const BackArrow = isRTL ? ArrowRight : ArrowLeft;

    return (
        <div className="page" style={{ padding: 0, paddingBottom: 90 }}>
            {/* Hero Image */}
            <div className="detail-hero">
                <img src={course.image} alt={course.title} />
                <div className="detail-hero-overlay" />
                <button className="detail-back" onClick={() => navigate(-1)}>
                    <BackArrow size={18} />
                </button>
            </div>

            <div className="detail-content" style={{ padding: '0 16px' }}>
                {/* Badges */}
                <div className="detail-badges">
                    <span className="detail-badge level">{course.level}</span>
                    {cat && <span className="detail-badge category">{cat.icon} {cat.name}</span>}
                </div>

                <h1 className="detail-title">{course.title}</h1>

                {/* Instructor */}
                <div className="detail-instructor">
                    <div className="detail-instructor-avatar">{course.instructor.charAt(3)}</div>
                    <div className="detail-instructor-info">
                        <h4>{course.instructor}</h4>
                        <p>{course.instructorTitle}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="detail-stats">
                    <div className="detail-stat">
                        <div className="detail-stat-value"><Star size={16} fill="#fdcb6e" stroke="#fdcb6e" /> {course.rating}</div>
                        <div className="detail-stat-label">{course.reviews} {t('reviews')}</div>
                    </div>
                    <div className="detail-stat">
                        <div className="detail-stat-value"><FileText size={16} style={{ color: 'var(--primary)' }} /> {totalPages}</div>
                        <div className="detail-stat-label">{t('page')}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="detail-tabs">
                    <button className={`detail-tab ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>{t('descriptionTab')}</button>
                    <button className={`detail-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>{t('reviewsTab')}</button>
                </div>

                {/* Tab Content */}
                {activeTab === 'description' && (
                    <p className="detail-description">{course.description}</p>
                )}



                {activeTab === 'reviews' && (
                    <div>
                        {/* نموذج التقييم */}
                        {!hasReviewed && (
                            <div className={`review-form ${showRatingPrompt ? 'highlight' : ''}`}>
                                <h4 className="review-form-title">{t('rateCourse')}</h4>
                                {showRatingPrompt && (
                                    <p className="review-form-hint">{t('rateBeforeCart')}</p>
                                )}
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            className={`star-btn ${star <= userRating ? 'active' : ''}`}
                                            onClick={() => setUserRating(star)}
                                        >
                                            <Star size={28} fill={star <= userRating ? '#fdcb6e' : 'transparent'} stroke={star <= userRating ? '#fdcb6e' : 'var(--text-muted)'} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className="review-textarea"
                                    placeholder={t('reviewPlaceholder')}
                                    value={userReview}
                                    onChange={(e) => setUserReview(e.target.value)}
                                    maxLength={200}
                                    rows={3}
                                />
                                <div className="review-form-footer">
                                    <span className="review-char-count">{userReview.length}/200</span>
                                    {reviewError && <p className="review-error">{reviewError}</p>}
                                    <button className="review-submit-btn" onClick={submitReview}>
                                        {t('submitReview')}
                                    </button>
                                </div>
                            </div>
                        )}

                        {hasReviewed && (
                            <div className="review-success">
                                <Check size={18} />
                                <span>{t('thankReview')}</span>
                            </div>
                        )}

                        {/* التقييمات الموجودة */}
                        {reviews.map((review, i) => (
                            <div key={i} className="review-item">
                                <div className="review-header">
                                    <div className="review-avatar">{review.name.charAt(0)}</div>
                                    <span className="review-name">{review.name}</span>
                                    <span className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                </div>
                                <p className="review-text">{review.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Buy Bar - Fixed at bottom */}
            <div className="detail-buy-bar">
                <div className="detail-buy-price">
                    <div className="current">{course.price.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 500 }}>{t('currency')}</span></div>
                    {course.originalPrice > course.price && (
                        <div className="original">{course.originalPrice.toLocaleString()} {t('currency')}</div>
                    )}
                </div>
                <button className={`btn-buy ${inCart ? 'in-cart' : ''}`} onClick={handleAddToCart}>
                    {inCart ? <><Check size={18} /> {t('inCart')}</> : <><ShoppingCart size={18} /> {t('addToCart')}</>}
                </button>
            </div>
        </div>
    );
}
