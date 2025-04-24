import React, { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div className="min-h-screen bg-[#9BD2FF] p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-black mb-4">Добро пожаловать в Kanban Workshop!</h1>
            <p className="text-lg text-gray-800 mb-6">
                Это React-приложение. Скоро мы создадим Kanban-доску!
            </p>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-xl text-black">Ты кликнул: {count} раз</p>
                <button
                    className="mt-2 px-4 py-2 bg-[#2499EC] text-white rounded hover:bg-[#1E82C7] transition"
                    onClick={handleClick}
                >
                    Кликни меня!
                </button>
            </div>
        </div>
    );
}