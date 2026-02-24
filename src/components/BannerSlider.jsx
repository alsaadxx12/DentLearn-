import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners as defaultBanners } from '../data/banners';

export default function BannerSlider() {
    const [current, setCurrent] = useState(0);
    const activeBanners = defaultBanners.filter(b => b.active);

    const next = useCallback(() => {
        setCurrent(prev => (prev + 1) % activeBanners.length);
    }, [activeBanners.length]);

    const prev = () => {
        setCurrent(prev => (prev - 1 + activeBanners.length) % activeBanners.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [next]);

    if (activeBanners.length === 0) return null;

    const banner = activeBanners[current];

    return (
        <div className="banner-slider">
            <div className="banner-track">
                <div className="banner-slide">
                    <img src={banner.image} alt={banner.title} className="banner-image" />
                    <div className="banner-overlay" style={{ background: `linear-gradient(to right, ${banner.color}cc 0%, transparent 100%)` }} />
                    <div className="banner-content">
                        <h3 className="banner-title">{banner.title}</h3>
                        <p className="banner-subtitle">{banner.subtitle}</p>
                    </div>
                </div>
            </div>
            <div className="banner-controls">
                <button className="banner-arrow" onClick={prev}><ChevronRight size={14} /></button>
                <div className="banner-dots">
                    {activeBanners.map((_, i) => (
                        <button
                            key={i}
                            className={`banner-dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                        />
                    ))}
                </div>
                <button className="banner-arrow" onClick={next}><ChevronLeft size={14} /></button>
            </div>
        </div>
    );
}
