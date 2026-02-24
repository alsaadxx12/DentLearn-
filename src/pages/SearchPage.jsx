import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { courses } from '../data/courses';
import CourseCard from '../components/CourseCard';
import { useLanguage } from '../context/LanguageContext';

const recentSearches = ['تقويم الأسنان', 'تجميل', 'جراحة', 'زراعة'];

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { t, isRTL } = useLanguage();

    const results = query.length > 0
        ? courses.filter(c =>
            c.title.includes(query) ||
            c.instructor.includes(query) ||
            c.category.includes(query)
        )
        : [];

    return (
        <div className="page search-page">
            <div className="search-page-header">
                <button className="search-back-btn" onClick={() => navigate(-1)}>
                    {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                </button>
                <div className="search-bar search-page-input">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder={t('searchCourseOrSeller')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            {query.length === 0 ? (
                <div className="recent-searches">
                    <h3 className="recent-title">{t('recentSearches')}</h3>
                    {recentSearches.map((s, i) => (
                        <button key={i} className="recent-item" onClick={() => setQuery(s)}>
                            <Clock size={14} />
                            <span>{s}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <>
                    <p className="search-results-count">{results.length} {t('result')}</p>
                    <div className="courses-grid">
                        {results.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                    {results.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <h3 className="empty-state-title">{t('noResults')}</h3>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
