import React, {use, useState} from "react";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import Card from './components/Card.jsx'
import Column from './components/Column.jsx'
import Board from "./components/Board.jsx";
import Filter from "./components/Filter.jsx";
import DialogModal from "./components/DialogModal.jsx";

const initialColumns = [
    {
        id: 'first',
        title: 'Новые'
    }
];

const labelList = {
    urgent: {title: 'Срочная', color: 'bg-[#FFA3A6]'},
    study: {title: 'Учеба', color: 'bg-[#A0FFE5]'},
    work: {title: 'Работа', color: 'bg-[#F5A9FF]'},
    not_important: {title: 'Неважная', color: 'bg-[#B6FA99]'},
    none: {title: 'Нет метки', color: 'bg-gray-400'}
};


const cardsData = [
    {
        cardId: crypto.randomUUID(),
        column: 'first',
        title: "Сделать дизайн",
        description: "Нарисовать UI для главной страницы",
        createdAt: "2025-04-17T12:00:00Z",
        label: 'urgent',
        ending: '',
    }
];

export default function App() {
    const [columns, setColumns] = useState(initialColumns);
    const [cards, setCards] = useState(cardsData);
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [sortLabel, setSortLabel] = useState("");
    const [currentCard, setCurrentCard] = useState('');

    function createNewCard(columnId) {
        if (newCardTitle.trim() === "") {
            setIsAddingCard(false);
            return;
        }
        const newCard = {
            cardId: crypto.randomUUID(),
            column: columnId,
            title: newCardTitle,
            description: "",
            createdAt: new Date().toISOString(),
            label: sortLabel || 'none',
            ending: "",
        }
        setCards((prev) => [...prev, newCard]);
        setNewCardTitle("");
        setIsAddingCard(false);
    }

    function createNewColumn(event) {
        if (newColumnTitle.trim() === "") {
            setIsAddingColumn(false);
            return;
        }
        const newColumn = {
            id: crypto.randomUUID(),
            title: newColumnTitle.trim(),
        };
        setColumns((prev) => [...prev, newColumn]);
        setNewColumnTitle("");
        setIsAddingColumn(false);
    }

    const updateCard = (cardId, props) => {
        setCards((prev) =>
           prev.map(card => card.cardId === cardId ? {
                ...card, ...props
           } : card)
        );
        setCurrentCard('');
    };

    const deleteCard = (cardId) => {
        setCards(cards.filter(card => card.cardId !== cardId));
        setCurrentCard('');
    };

    const closeDialogModal = () => {
        if (!currentCard) return;
        setCurrentCard("");
    };

    const onCardClick = (cardId) => {
        const card = cards.find(card => card.cardId === cardId);
        setCurrentCard(card);
    };

    const boardProps = {
        columns,
        isAddingColumn,
        setIsAddingColumn,
        newColumnTitle,
        setNewColumnTitle,
        createNewColumn,
        setCards,
    };

    const columnProps = {
        isAddingCard,
        setIsAddingCard,
        newCardTitle,
        setNewCardTitle,
        createNewCard,
    };

    const cardProps = {
        labelList,
        onCardClick
    };

    return (
        <div className="app bg-[#9BD2FF]">
            <div className="title">
                <Squares2X2Icon className="fill-black w-[50px]" />
                <p className="text-3xl text-black font-bold">Kanban Board</p>
            </div>
            <div className="main-area bg-[#2499EC]">
                {currentCard ? (
                        <DialogModal
                            card={currentCard}
                            onClose={closeDialogModal}
                            onSave={updateCard}
                            onDelete={deleteCard}
                            labelList={labelList}
                            columns={columns}
                        />)
                    : (<div></div>)}
                <Filter
                    labels={labelList}
                    sortLabel={sortLabel}
                    setSortLabel={setSortLabel}
                />
                <Board
                    boardProps={boardProps}
                    columnProps={columnProps}
                    cardProps={cardProps}
                    cards={cards.filter((card) => !sortLabel || card.label === sortLabel)}
                />
            </div>
        </div>
    );
}
