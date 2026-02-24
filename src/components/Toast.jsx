import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message, show, onHide }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onHide, 2500);
            return () => clearTimeout(timer);
        }
    }, [show, onHide]);

    return (
        <div className={`toast ${show ? 'show' : ''}`}>
            <CheckCircle size={18} />
            {message}
        </div>
    );
}
