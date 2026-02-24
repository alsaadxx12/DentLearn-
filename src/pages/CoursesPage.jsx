import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { courses } from '../data/courses';
import { categories } from '../data/categories';
import CourseCard from '../components/CourseCard';
import { useLanguage } from '../context/LanguageContext';

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const { t } = useLanguage();

    const filtered = useMemo(() => {
        let result = [...courses];
        if (activeCategory !== 'all') {
            result = result.filter(c => c.category === activeCategory);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(term) ||
                c.instructor.toLowerCase().includes(term)
            );
        }
        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            default: result.sort((a, b) => b.students - a.students);
        }
        return result;
    }, [searchTerm, activeCategory, sortBy]);

    return (
        <div className="page">
            <h1 className="page-title">{t('allCourses')}</h1>

            <div className="search-bar" style={{ marginBottom: 16 }}>
                <Search />
                <input
                    type="text"
                    placeholder={t('searchCourseOrLecturer')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="categories-scroll">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        <span className="category-chip-icon">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="filter-bar">
                <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
                <div className="filter-sort">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popular">{t('sortPopular')}</option>
                        <option value="rating">{t('sortRating')}</option>
                        <option value="price-low">{t('sortPriceLow')}</option>
                        <option value="price-high">{t('sortPriceHigh')}</option>
                    </select>
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', marginRight: 'auto' }}>
                    {filtered.length} {t('course')}
                </span>
            </div>

            <div className="courses-grid">
                {filtered.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3 className="empty-state-title">{t('noResults')}</h3>
                    <p className="empty-state-text">{t('tryOtherWords')}</p>
                </div>
            )}
        </div>
    );
}
