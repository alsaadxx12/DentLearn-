import { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
    useEffect(() => {
        const timer = setTimeout(onFinish, 3000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="splash">
            <div className="splash-logo">🦷</div>
            <h1 className="splash-title">DentLearn</h1>
            <p className="splash-subtitle">منصة كورسات طب الأسنان</p>
            <div className="splash-loader" />
        </div>
    );
}
