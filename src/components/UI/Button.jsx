import React from 'react';
import clsx from 'clsx';
export default function Button({ text, onClick, color = 'bg-white', className = '' }) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                'rounded-sm py-0.5 drop-shadow-sm text-black font-semibold text-lg flex items-center justify-center active:scale-105 cursor-pointer select-none',
                color,
                className
            )}
        >
            {text}
        </div>
    );
}