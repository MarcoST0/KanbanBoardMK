import React from 'react';

export default function Filter({ labels, sortLabel, setSortLabel }) {
    return (
        <div className="bg-column drop-shadow-2xl h-fit flex flex-row p-4 gap-10">
            <span
                className={`card-label active:scale-105 text-black text-sm font-semibold bg-white mr-20`}
                onClick={() => setSortLabel("")}
            >
                Все
            </span>
            {Object.entries(labels).map(([id, label]) => (
                <span
                    key={id}
                    className={`card-label active:scale-105 text-black text-sm font-semibold ${sortLabel === id ? `${label.color} border-3` : label.color}`}
                    onClick={() => setSortLabel(id)}
                >
                    {label.title}
                </span>
            ))}
        </div>
    );
}
