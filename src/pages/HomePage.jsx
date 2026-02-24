import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin, ChevronDown, Flame, TrendingUp, Award, BadgePercent, X, MapPinned, Navigation, Menu, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { courses } from '../data/courses';
import { categories } from '../data/categories';
import CourseCard from '../components/CourseCard';
import BannerSlider from '../components/BannerSlider';
import { useLanguage } from '../context/LanguageContext';

const savedAddresses = [
    { id: 1, label: 'المنزل', address: 'بغداد، حي الجامعة', active: true },
    { id: 2, label: 'العمل', address: 'بغداد، شارع فلسطين', active: false },
];

const iraqCities = ['بغداد', 'البصرة', 'أربيل', 'النجف', 'كربلاء', 'الموصل', 'السليمانية', 'الحلة', 'كركوك', 'الناصرية'];

export default function HomePage() {
    const [activeFilter, setActiveFilter] = useState('popular');
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('بغداد، العراق');
    const [filtersSticky, setFiltersSticky] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [sidebarSearch, setSidebarSearch] = useState('');
    const filterRef = useRef(null);
    const navigate = useNavigate();
    const { t, isRTL } = useLanguage();

    const filters = [
        { id: 'popular', label: t('filterPopular'), icon: Flame },
        { id: 'bestseller', label: t('filterBestseller'), icon: TrendingUp },
        { id: 'top-rated', label: t('filterTopRated'), icon: Award },
        { id: 'discount', label: t('filterDiscount'), icon: BadgePercent, red: true },
    ];

    const featuredCourses = courses.filter(c => c.bestseller || c.featured).slice(0, 6);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setFiltersSticky(!entry.isIntersecting),
            { threshold: 0, rootMargin: '-120px 0px 0px 0px' }
        );
        if (filterRef.current) observer.observe(filterRef.current);
        return () => observer.disconnect();
    }, []);

    const getFilteredCourses = () => {
        switch (activeFilter) {
            case 'bestseller':
                return courses.filter(c => c.bestseller).slice(0, 4);
            case 'top-rated':
                return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 4);
            case 'discount':
                return [...courses]
                    .filter(c => c.originalPrice && c.originalPrice > c.price)
                    .sort((a, b) => {
                        const discA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
                        const discB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
                        return discB - discA;
                    })
                    .slice(0, 4);
            case 'popular':
            default:
                return courses.filter(c => c.bestseller || c.featured).slice(0, 4);
        }
    };

    const selectAddress = (addr) => {
        setSelectedLocation(addr.address);
        setShowLocationModal(false);
    };

    const selectCity = (city) => {
        setSelectedLocation(`${city}، العراق`);
        setShowLocationModal(false);
    };

    const renderFilters = () => (
        <div className="filter-bar">
            {filters.map(f => {
                const Icon = f.icon;
                return (
                    <button
                        key={f.id}
                        className={`filter-chip ${activeFilter === f.id ? 'active' : ''} ${f.red && activeFilter === f.id ? 'active-red' : ''} ${f.red && activeFilter !== f.id ? 'red' : ''}`}
                        onClick={() => setActiveFilter(f.id)}
                    >
                        <Icon size={14} />
                        <span>{f.label}</span>
                    </button>
                );
            })}
        </div>
    );

    const Arrow = isRTL ? ChevronLeft : ChevronRight;

    return (
        <div className="page home-page">
            {/* ===== الشريط العلوي الثابت ===== */}
            <div className="sticky-top-bar">
                <div className="top-bar">
                    <div className="top-bar-group">
                        <button className="top-bar-notification" onClick={() => setShowSidebar(true)}>
                            <Menu size={20} />
                        </button>
                        <button className="top-bar-notification" onClick={() => navigate('/search')}>
                            <Search size={20} />
                        </button>
                    </div>
                    <button className="location-bar" onClick={() => setShowLocationModal(true)}>
                        <MapPin size={16} className="location-icon" />
                        <span className="location-text">{selectedLocation}</span>
                        <ChevronDown size={14} />
                    </button>
                    <div className="top-bar-group">
                        <button className="top-bar-notification" onClick={() => navigate('/cart')}>
                            <ShoppingCart size={20} />
                        </button>
                        <button className="top-bar-notification">
                            <Bell size={20} />
                            <span className="notification-dot" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== القائمة الجانبية ===== */}
            {showSidebar && <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />}
            <div className={`sidebar-drawer ${showSidebar ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>{t('specialties')}</h3>
                    <button className="sidebar-close" onClick={() => setShowSidebar(false)}>
                        <X size={20} />
                    </button>
                </div>
                <div className="sidebar-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder={t('searchSpecialty')}
                        className="sidebar-search-input"
                        value={sidebarSearch}
                        onChange={(e) => setSidebarSearch(e.target.value)}
                    />
                </div>
                <div className="sidebar-categories">
                    {categories.filter(c => c.id !== 'all').filter(c => c.name.includes(sidebarSearch)).map(cat => (
                        <button
                            key={cat.id}
                            className="sidebar-cat-item"
                            onClick={() => { setShowSidebar(false); setSidebarSearch(''); }}
                        >
                            <div className="sidebar-cat-info">
                                <span className="sidebar-cat-icon">{cat.icon}</span>
                                <span className="sidebar-cat-name">{cat.name}</span>
                            </div>
                            <Arrow size={16} className="sidebar-cat-arrow" />
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== شرائح الإعلانات ===== */}
            <BannerSlider />

            {/* ===== التخصصات + فلاتر ثابتة ===== */}
            <div className="sticky-section">
                <div className="categories-grid-scroll">
                    {categories.filter(c => c.id !== 'all').map(cat => (
                        <div key={cat.id} className="category-card">
                            <div className="category-card-image">
                                <img src={cat.image} alt={cat.name} />
                                <div className="category-card-overlay" />
                            </div>
                            <span className="category-card-name">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* فلاتر ثابتة - تظهر أسفل التخصصات عند التمرير */}
                {filtersSticky && (
                    <div className="sticky-filter-bar">
                        {renderFilters()}
                    </div>
                )}
            </div>

            {/* ===== شريط الأكثر شيوعاً ===== */}
            <div className="featured-section">
                <h2 className="section-title">{t('mostPopular')}</h2>
                <div className="featured-strip">
                    {featuredCourses.map(course => {
                        const discount = course.originalPrice ? Math.round((1 - course.price / course.originalPrice) * 100) : 0;
                        return (
                            <Link to={`/course/${course.id}`} key={course.id} className="featured-strip-card">
                                <img src={course.image} alt={course.title} className="featured-strip-img" />
                                <div className="featured-strip-overlay" />
                                <div className="featured-strip-content">
                                    <span className="featured-strip-title">{course.title}</span>
                                    <span className="featured-strip-instructor">{course.instructor}</span>
                                    <span className="featured-strip-price">{course.price.toLocaleString()} {t('currency')}</span>
                                </div>
                                {discount > 0 && <span className="featured-strip-discount">-{discount}%</span>}
                                {course.bestseller && <span className="featured-strip-badge">🔥</span>}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* ===== فلاتر - الموضع الأصلي ===== */}
            <div ref={filterRef}>
                {renderFilters()}
            </div>

            {/* ===== الكورسات ===== */}
            <div className="courses-grid">
                {getFilteredCourses().map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {/* ===== مودال الموقع ===== */}
            {showLocationModal && (
                <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
                    <div className="modal-content location-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t('chooseLocation')}</h3>
                            <button className="modal-close" onClick={() => setShowLocationModal(false)}><X size={18} /></button>
                        </div>

                        <p className="location-section-label">{t('savedAddress')}</p>
                        <div className="saved-addresses">
                            {savedAddresses.map(addr => (
                                <button
                                    key={addr.id}
                                    className={`saved-address-item ${selectedLocation === addr.address ? 'active' : ''}`}
                                    onClick={() => selectAddress(addr)}
                                >
                                    <div className="saved-address-icon">
                                        <MapPinned size={18} />
                                    </div>
                                    <div className="saved-address-info">
                                        <span className="saved-address-label">{addr.label}</span>
                                        <span className="saved-address-text">{addr.address}</span>
                                    </div>
                                    {selectedLocation === addr.address && <span className="saved-address-check">✓</span>}
                                </button>
                            ))}
                        </div>


                        <button className="location-detect-btn">
                            <Navigation size={16} />
                            <span>{t('detectLocation')}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
