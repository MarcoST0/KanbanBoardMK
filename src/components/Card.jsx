import React from 'react'
import clsx from 'clsx';

export default function Card(props) {
    const labelColor = props.labelList[props.label].color || "bg-gray-400";
    const labelText = props.labelList[props.label].title || "Нет метки";


    return (
        <div className="card bg-[#E1EFFB] hover:bg-[#E6F8FF] hover:scale-105"
             onClick={() => props.onCardClick(props.cardId)}
        >
            <div>
                <div className="card-flex">
                    <h2 className="text-xl text-black font-semibold">{props.title}</h2>
                    <span className={clsx(
                        "text-black text-xs font-semibold ",
                        props.ending && " before:content-['До '] ")}>{props.ending}</span>
                </div>
                <p className="card-description text-sm text-gray-700">{props.description}</p>
            </div>
            <div className="card-flex">
                <p className="text-xs text-black font-semibold">{new Date(props.createdAt).toLocaleDateString()}</p>
                <span className={`card-label text-black text-sm font-semibold  ${labelColor}`}>{labelText}</span>
            </div>
        </div>
    );
}