import React, {useState} from 'react';
import {Bars3BottomLeftIcon, Square2StackIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {BellIcon, WrenchIcon} from "@heroicons/react/24/outline/index.js";
import Button from "./UI/Button.jsx";

export default function DialogModal({ card, onClose, onSave, onDelete, labelList, columns }) {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [column, setColumn] = useState(card.column)
    const [label, setLabel] = useState(card.label);
    const [ending, setEnding] = useState(card.ending);

    const save = () => {
        onSave(card.cardId, {...card, title, description, label, ending, column})
    };

    const SectionHeader = ({ icon: Icon, text }) => (
        <div className="flex items-center gap-5">
            <Icon className="w-5 stroke-black" />
            <h3 className="text-2xl font-semibold text-black">{text}</h3>
        </div>
    );

    return (
        <div className="fixed z-10 inset-0 backdrop-blur-xs flex flex-col pt-30 items-center">
            <div className=" w-[600px] h-[660px] bg-[#E1EFFB] rounded-xl drop-shadow-2xl flex flex-col gap-5 p-3">
                <div className="flex flex-row gap-5 items-center">
                    <Square2StackIcon className="fill-black w-5"/>
                    <input
                        value={title}
                        maxLength={30}
                        placeholder="Название карточки..."
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        className="font-semibold w-[250px] text-2xl text-black focus:outline-none placeholder:text-lg"/>
                    <p className="font-semibold text-xs text-black">{new Date(card.createdAt).toLocaleString()}</p>
                    <XMarkIcon className="ml-auto w-5 fill-black cursor-pointer"
                               onClick={onClose}
                    />
                </div>
                <div className="flex flex-row gap-5">
                    <select
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className={`w-[160px] h-[30px] ml-10 px-5 rounded-full drop-shadow-sm text-black text-lg font-semibold focus:outline-none ${labelList[label].color}`}
                    >
                        {Object.entries(labelList).map(([key, data]) => (
                            <option key={key} value={key} className="bg-white">
                                {data.title}
                            </option>
                        ))}
                    </select>
                    <select
                        value={column}
                        onChange={(e) => setColumn(e.target.value)}
                        className={`w-[160px] h-[30px] ml-auto mr-10 px-5 bg-white rounded-lg drop-shadow-sm text-black text-lg font-semibold focus:outline-none`}
                    >
                        {Object.entries(columns).map(([key, data]) => (
                            <option key={key} value={data.id} className="bg-white">
                                {data.title}
                            </option>
                        ))}
                    </select>
                </div>
                <SectionHeader icon={Bars3BottomLeftIcon} text="Срок исполнения" />
                <textarea
                    value={description}
                    placeholder="Описание карточки..."
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    className="resize-none p-3 rounded-xl drop-shadow-sm bg-amber-50 w-[500px] h-[120px] ml-10 text-sm text-black focus:outline-none"
                />
                <SectionHeader icon={BellIcon} text="Срок исполнения" />
                <input
                    type="date"
                    value={ending}
                    placeholder=""
                    onChange={(e) => {
                        setEnding(e.target.value)
                    }}
                    className="ml-10 text-black text-lg font-semibold scheme-light w-fit rounded-xl bg-amber-50 px-5 py-1 drop-shadow-sm focus:outline-none"
                />
                <SectionHeader icon={WrenchIcon} text="Срок исполнения" />
                <div className="flex flex-row gap-10 ml-10">
                    <Button
                        className="w-[160px]"
                        onClick={() => save()}
                        color="bg-[#B6FA99]"
                        text="Сохранить"
                    />
                    <Button
                        className="w-[160px]"
                        onClick={() => onDelete(card.cardId)}
                        color="bg-[#FFA3A6]"
                        text="Удалить"
                    />
                </div>

            </div>

        </div>
    );
}
