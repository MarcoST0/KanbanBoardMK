import React from "react";
import Card from "./Card";
import Input from "./UI/Input.jsx"; // Убедись, что путь правильный

export default function Column({ id, title, cards, columnProps, cardProps }) {
    return (
        <div className="column bg-[#8CC5F4]">
            <h2 className="text-xl font-bold text-black mb-3 ml-3">{title}</h2>
            <div className="cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        cardId={card.cardId}
                        title={card.title}
                        description={card.description}
                        createdAt={card.createdAt}
                        ending={card.ending}
                        label={card.label}
                        {...cardProps}
                    />
                ))}
            </div>
            {columnProps.isAddingCard !== id ? (
                <h2 className="text-lg font-semibold text-black my-3 ml-3 cursor-pointer" onClick={() => columnProps.setIsAddingCard(id)}>+ Создать карточку</h2>
            ) : (
                <Input className="my-3 ml-3 text-lg"
                       autoFocus
                       value={columnProps.newCardTitle}
                       onChange={ (e) => columnProps.setNewCardTitle(e.target.value) }
                       onBlur={ (e) => columnProps.createNewCard(id) }
                       placeholder='Название карточки...'
                />
                )}

        </div>
    );
}
