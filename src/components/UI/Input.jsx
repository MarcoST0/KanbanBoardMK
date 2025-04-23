import React from 'react';

export default function Input({ value, onChange, onBlur, placeholder, className = '', autoFocus = false }) {
    return (
        <input
            type="text"
            autoFocus={autoFocus}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`rounded-none w-full focus:outline-none text-black font-semibold ${className}`}
        />
    );
}