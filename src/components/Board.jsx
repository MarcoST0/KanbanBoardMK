import React from 'react'
import Column from "./Column.jsx";
import Input from "./UI/Input.jsx";


export default function Board({boardProps, columnProps, cardProps, cards}) {
    return (
        <div className="columns">
            {boardProps.columns.map((column, index) => (
                <Column
                    key={index}
                    id={column.id}
                    title={column.title}
                    cards={cards.filter((card) => card.column === column.id)}
                    columnProps={columnProps}
                    cardProps={cardProps}
                />
            ))}
            <div className="columns_new bg-[#8CC5F4]">
                {!boardProps.isAddingColumn ? (
                        <h2 className="text-lg font-semibold text-black cursor-pointer" onClick={() => boardProps.setIsAddingColumn(true)}>+ Новая категория</h2>
                    ) : (
                        <Input className="p-0.5"
                               autoFocus
                               value={boardProps.newColumnTitle}
                               onChange={ (e) => boardProps.setNewColumnTitle(e.target.value) }
                               onBlur={ (e) => boardProps.createNewColumn() }
                               placeholder='Название категории...'
                        />
                )}
            < /div>
        </div>
    );
                }
