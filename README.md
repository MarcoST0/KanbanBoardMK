# Мастер-класс "Kanban Board"

В этом мастер-классе мы создадим Kanban-доску за 15 минут! Вы научитесь добавлять карточки, колонки, фильтровать задачи по меткам и редактировать их в модальном окне. Каждый этап добавляет новую часть приложения, и вы сразу увидите результат!

## Этап 1: Создаем основу приложения (App.jsx)

**Что делаем**: Создаем файл `App.jsx` с заголовком и фоном для доски.

**Инструкции**:
1. Создайте файл `src/App.jsx`.
2. Скопируйте код ниже.
3. Откройте приложение в браузере.

```jsx
import React from "react";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

export default function App() {
    return (
        <div className="app bg-[#9BD2FF]">
            <div className="title">
                <Squares2X2Icon className="fill-black w-[50px]" />
                <p className="text-3xl text-black font-bold">Kanban Board</p>
            </div>
            <div className="main-area bg-[#2499EC]">
                <p>Здесь будет наша доска!</p>
            </div>
        </div>
    );
}
```

**Результат**: Вы увидите заголовок "Kanban Board" с иконкой на голубом фоне.

---

## Этап 2: Создаем карточку задачи (Card.jsx)

**Что делаем**: Создаем компонент `Card.jsx` для отображения задачи и показываем его в `App.jsx`.

**Инструкции**:
1. Создайте файл `src/components/Card.jsx`.
2. Скопируйте код для `Card.jsx`.
3. Отредактируйте `App.jsx`, чтобы добавить карточку.

**Код для Card.jsx**:
```jsx
import React from 'react';
import clsx from 'clsx';

export default function Card(props) {
    const labelColor = props.labelList[props.label]?.color || "bg-gray-400";
    const labelText = props.labelList[props.label]?.title || "Нет метки";

    return (
        <div className="card bg-[#E1EFFB] hover:bg-[#E6F8FF] hover:scale-105">
            <div>
                <div className="card-flex">
                    <h2 className="text-xl text-black font-semibold">{props.title}</h2>
                </div>
                <p className="card-description text-sm text-gray-700">{props.description}</p>
            </div>
            <div className="card-flex">
                <p className="text-xs text-black font-semibold">{new Date(props.createdAt).toLocaleDateString()}</p>
                <span className={`card-label text-black text-sm font-semibold ${labelColor}`}>{labelText}</span>
            </div>
        </div>
    );
}
```

**Изменения в App.jsx**:
1. В начале файла, после импорта `React`, добавьте импорт `Card`:
   ```jsx
   import Card from "./components/Card.jsx";
   ```
2. Перед `return`, добавьте объект `labelList`:
   ```jsx
   const labelList = {
       urgent: {title: 'Срочная', color: 'bg-[#FFA3A6]'},
       none: {title: 'Нет метки', color: 'bg-gray-400'}
   };
   ```
3. Внутри `<div className="main-area bg-[#2499EC]">`, замените `<p>Здесь будет наша доска!</p>` на:
   ```jsx
   <Card
       title="Сделать дизайн"
       description="Нарисовать UI для главной страницы"
       createdAt="2025-04-17T12:00:00Z"
       label="urgent"
       labelList={labelList}
   />
   ```

**Результат**: В центре появится карточка "Сделать дизайн" с описанием, датой и меткой "Срочная". Наведите на нее — она увеличится!

---

## Этап 3: Создаем колонку (Column.jsx)

**Что делаем**: Создаем компонент `Column.jsx` для группировки карточек и показываем его в `App.jsx`.

**Инструкции**:
1. Создайте файл `src/components/Column.jsx`.
2. Скопируйте код для `Column.jsx`.
3. Отредактируйте `App.jsx`, чтобы показать колонку с карточкой.

**Код для Column.jsx**:
```jsx
import React from "react";
import Card from "./Card";

export default function Column({ id, title, cards, cardProps }) {
    return (
        <div className="column bg-[#8CC5F4] p-3 rounded-lg">
            <h2 className="text-xl font-bold text-black mb-3">{title}</h2>
            <div className="cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        cardId={card.cardId}
                        title={card.title}
                        description={card.description}
                        createdAt={card.createdAt}
                        label={card.label}
                        {...cardProps}
                    />
                ))}
            </div>
        </div>
    );
}
```

**Изменения в App.jsx**:
1. В начале файла, замените импорт `Card` на импорт `Column`:
   ```jsx
   import Column from "./components/Column.jsx";
   ```
2. Замените `labelList` на следующий код (добавляем массив `cards`):
   ```jsx
   const labelList = {
       urgent: {title: 'Срочная', color: 'bg-[#FFA3A6]'},
       none: {title: 'Нет метки', color: 'bg-gray-400'}
   };

   const cards = [
       {
           cardId: crypto.randomUUID(),
           title: "Сделать дизайн",
           description: "Нарисовать UI для главной страницы",
           createdAt: "2025-04-17T12:00:00Z",
           label: "urgent"
       }
   ];
   ```
3. Внутри `<div className="main-area bg-[#2499EC]">`, замените `<Card ... />` на:
   ```jsx
   <Column
       id="first"
       title="Новые"
       cards={cards}
       cardProps={{ labelList }}
   />
   ```

**Результат**: Карточка теперь в колонке "Новые" с заголовком. Это похоже на Kanban-доску!

---

## Этап 4: Объединяем в доску (Board.jsx)

**Что делаем**: Создаем компонент `Board.jsx` для отображения колонок и добавляем его в `App.jsx`.

**Инструкции**:
1. Создайте файл `src/components/Board.jsx`.
2. Скопируйте код для `Board.jsx`.
3. Отредактируйте `App.jsx`, чтобы использовать `Board`.

**Код для Board.jsx**:
```jsx
import React from 'react';
import Column from "./Column.jsx";

export default function Board({ boardProps, columnProps, cardProps, cards }) {
    return (
        <div className="columns flex gap-4">
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
        </div>
    );
}
```

**Изменения в App.jsx**:
1. В начале файла, замените импорт `Column` на импорт `Board` и добавьте `useState`:
   ```jsx
   import React, { useState } from "react";
   import { Squares2X2Icon } from "@heroicons/react/24/solid";
   import Board from "./components/Board.jsx";
   ```
2. Замените `labelList` и `cards` на следующий код (добавляем `initialColumns`):
   ```jsx
   const labelList = {
       urgent: {title: 'Срочная', color: 'bg-[#FFA3A6]'},
       none: {title: 'Нет метки', color: 'bg-gray-400'}
   };

   const initialColumns = [
       { id: 'first', title: 'Новые' }
   ];

   const cards = [
       {
           cardId: crypto.randomUUID(),
           column: 'first',
           title: "Сделать дизайн",
           description: "Нарисовать UI для главной страницы",
           createdAt: "2025-04-17T12:00:00Z",
           label: "urgent"
       }
   ];
   ```
3. Внутри `<div className="main-area bg-[#2499EC]">`, замените `<Column ... />` на:
   ```jsx
   <Board
       boardProps={{ columns: initialColumns }}
       columnProps={{}}
       cardProps={{ labelList }}
       cards={cards}
   />
   ```

**Результат**: Колонка "Новые" с карточкой отображается через `Board`. Теперь можно добавить больше колонок!

---

## Этап 5: Добавляем создание колонок и карточек

**Что делаем**: Добавляем возможность создавать колонки и карточки в `App.jsx`, `Column.jsx` и `Board.jsx`.

**Инструкции**:
1. Отредактируйте `App.jsx`, добавив состояния и функции.
2. Отредактируйте `Column.jsx`, чтобы поддерживать создание карточек.
3. Отредактируйте `Board.jsx`, чтобы поддерживать создание колонок.

**Изменения в App.jsx**:
1. Замените `labelList`, `initialColumns` и `cards` на следующий код (добавляем состояния):
   ```jsx
   const labelList = {
       urgent: {title: 'Срочная', color: 'bg-[#FFA3A6]'},
       none: {title: 'Нет метки', color: 'bg-gray-400'}
   };

   const [columns, setColumns] = useState([{ id: 'first', title: 'Новые' }]);
   const [cards, setCards] = useState([
       {
           cardId: crypto.randomUUID(),
           column: 'first',
           title: "Сделать дизайн",
           description: "Нарисовать UI для главной страницы",
           createdAt: "2025-04-17T12:00:00Z",
           label: "urgent"
       }
   ]);
   const [isAddingColumn, setIsAddingColumn] = useState(false);
   const [newColumnTitle, setNewColumnTitle] = useState("");
   const [isAddingCard, setIsAddingCard] = useState(false);
   const [newCardTitle, setNewCardTitle] = useState("");

   function createNewColumn() {
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
           label: 'none',
           ending: "",
       };
       setCards((prev) => [...prev, newCard]);
       setNewCardTitle("");
       setIsAddingCard(false);
   }
   ```
2. Внутри `<Board>`, замените `boardProps` и `columnProps` на:
   ```jsx
   boardProps={{
       columns,
       isAddingColumn,
       setIsAddingColumn,
       newColumnTitle,
       setNewColumnTitle,
       createNewColumn,
       setCards
   }}
   columnProps={{
       isAddingCard,
       setIsAddingCard,
       newCardTitle,
       setNewCardTitle,
       createNewCard
   }}
   ```

**Изменения в Column.jsx**:
1. В начале файла, после импорта `Card`, добавьте импорт `Input`:
   ```jsx
   import Input from "./UI/Input.jsx";
   ```
2. После `<div className="cards">...</div>`, добавьте:
   ```jsx
   {columnProps.isAddingCard !== id ? (
       <h2 className="text-lg font-semibold text-black my-3 cursor-pointer" onClick={() => columnProps.setIsAddingCard(id)}>+ Создать карточку</h2>
   ) : (
       <Input
           className="my-3 text-lg"
           autoFocus
           value={columnProps.newCardTitle}
           onChange={(e) => columnProps.setNewCardTitle(e.target.value)}
           onBlur={() => columnProps.createNewCard(id)}
           placeholder="Название карточки..."
       />
   )}
   ```

**Изменения в Board.jsx**:
1. В начале файла, после импорта `Column`, добавьте импорт `Input`:
   ```jsx
   import Input from "./UI/Input.jsx";
   ```
2. После маппинга колонок `{boardProps.columns.map(...)}`, добавьте:
   ```jsx
   <div className="columns_new bg-[#8CC5F4] p-3 rounded-lg">
       {!boardProps.isAddingColumn ? (
           <h2 className="text-lg font-semibold text-black cursor-pointer" onClick={() => boardProps.setIsAddingColumn(true)}>+ Новая категория</h2>
       ) : (
           <Input
               className="p-0.5"
               autoFocus
               value={boardProps.newColumnTitle}
               onChange={(e) => boardProps.setNewColumnTitle(e.target.value)}
               onBlur={() => boardProps.createNewColumn()}
               placeholder="Название категории..."
           />
       )}
   </div>
   ```

**Результат**: Нажмите "+ Новая категория", введите название (например, "В процессе") — появится новая колонка. В колонке "Новые" нажмите "+ Создать карточку", введите название (например, "Купить продукты") — добавится карточка.

---

## Этап 6: Добавляем фильтры (Filter.jsx)

**Что делаем**: Создаем компонент `Filter.jsx` для сортировки карточек по меткам.

**Инструкции**:
1. Создайте файл `src/components/Filter.jsx`.
2. Скопируйте код для `Filter.jsx`.
3. Отредактируйте `App.jsx`, чтобы добавить фильтр.

**Код для Filter.jsx**:
```jsx
import React from 'react';

export default function Filter({ labels, sortLabel, setSortLabel }) {
    return (
        <div className="bg-column drop-shadow-2xl h-fit flex flex-row p-4 gap-10">
            <span
                className="card-label active:scale-105 text-black text-sm font-semibold bg-white mr-20"
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
```

**Изменения в App.jsx**:
1. В начале файла, после импорта `Board`, добавьте импорт `Filter`:
   ```jsx
   import Filter from "./components/Filter.jsx";
   ```
2. Перед `return`, после состояния `newCardTitle`, добавьте:
   ```jsx
   const [sortLabel, setSortLabel] = useState("");
   ```
3. Внутри `<div className="main-area bg-[#2499EC] p-4">`, перед `<Board>`, добавьте:
   ```jsx
   <Filter
       labels={labelList}
       sortLabel={sortLabel}
       setSortLabel={setSortLabel}
   />
   ```
4. В `<Board>`, замените `cards={cards}` на:
   ```jsx
   cards={cards.filter((card) => !sortLabel || card.label === sortLabel)}
   ```

**Результат**: Появится панель с фильтрами "Все", "Срочная", "Нет метки". Нажмите "Срочная" — останутся карточки с меткой "Срочная". Нажмите "Все" — вернутся все карточки.

---

## Этап 7: Добавляем модальное окно (DialogModal.jsx)

**Что делаем**: Создаем компонент `DialogModal.jsx` для редактирования и удаления карточек.

**Инструкции**:
1. Создайте файл `src/components/DialogModal.jsx`.
2. Скопируйте код для `DialogModal.jsx`.
3. Отредактируйте `App.jsx`, чтобы открыть модальное окно при клике на карточку.

**Код для DialogModal.jsx**:
```jsx
import React, { useState } from 'react';
import { Square2StackIcon, XMarkIcon } from "@heroicons/react/16/solid/index.js";
import Button from "./UI/Button.jsx";

export default function DialogModal({ card, onClose, onSave, onDelete, labelList, columns }) {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [label, setLabel] = useState(card.label);

    const save = () => {
        onSave(card.cardId, { ...card, title, description, label });
    };

    return (
        <div className="fixed z-10 inset-0 backdrop-blur-xs flex flex-col pt-30 items-center">
            <div className="w-[600px] h-[400px] bg-[#E1EFFB] rounded-xl drop-shadow-2xl flex flex-col gap-5 p-3">
                <div className="flex flex-row gap-5 items-center">
                    <Square2StackIcon className="fill-black w-5"/>
                    <input
                        value={title}
                        maxLength={30}
                        placeholder="Название карточки..."
                        onChange={(e) => setTitle(e.target.value)}
                        className="font-semibold w-[250px] text-2xl text-black focus:outline-none placeholder:text-lg"
                    />
                    <XMarkIcon
                        className="ml-auto w-5 fill-black cursor-pointer"
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
                </div>
                <textarea
                    value={description}
                    placeholder="Описание карточки..."
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none p-3 rounded-xl drop-shadow-sm bg-amber-50 w-[500px] h-[120px] ml-10 text-sm text-black focus:outline-none"
                />
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
```

**Изменения в App.jsx**:
1. В начале файла, после импорта `Filter`, добавьте импорт `DialogModal`:
   ```jsx
   import DialogModal from "./components/DialogModal.jsx";
   ```
2. Перед `return`, после состояния `sortLabel`, добавьте:
   ```jsx
   const [currentCard, setCurrentCard] = useState('');

   const updateCard = (cardId, props) => {
       setCards((prev) =>
           prev.map(card => card.cardId === cardId ? { ...card, ...props } : card)
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
   ```
3. Внутри `<div className="main-area bg-[#2499EC] p-4">`, перед `<Filter>`, добавьте:
   ```jsx
   {currentCard ? (
       <DialogModal
           card={currentCard}
           onClose={closeDialogModal}
           onSave={updateCard}
           onDelete={deleteCard}
           labelList={labelList}
           columns={columns}
       />
   ) : (<div></div>)}
   ```
4. В `<Board>`, замените `cardProps={{ labelList }}` на:
   ```jsx
   cardProps={{ labelList, onCardClick }}
   ```

**Результат**: Кликните на карточку — откроется модальное окно. Измените название, описание или метку, нажмите "Сохранить" — карточка обновится. Нажмите "Удалить" — карточка исчезнет.

---

## Полезные советы

- **Для инструктора**:
  - Показывайте на экране, куда вставлять код, и объясняйте в 1-2 предложениях (например, "Это добавляет кнопку для создания карточек").
  - Давайте школьникам 1-2 минуты на копирование/вставку и проверку результата.
  - После каждого этапа спрашивайте: "Кто видит новую карточку? У кого открылось окно?".
- **Для школьников**:
  - Если что-то не работает, проверьте, правильно ли вставлен код, и спросите инструктора.
  - Вставляйте код точно в указанное место, чтобы ничего не сломать!
- **Время**: 7 этапов по ~2-3 минуты (копирование + объяснение + проверка) укладываются в 15 минут.
- **Упрощение**: Если времени мало, пропустите Этап 7 (модальное окно) — доска останется функциональной с колонками, карточками и фильтрами.
- **Зависимости**: Убедитесь, что `UI/Input.jsx` и `UI/Button.jsx` существуют или замените их на стандартные `<input>` и `<button>` для простоты, например:
  - Для `Input.jsx`:
    ```jsx
    import React from 'react';

    export default function Input(props) {
        return <input {...props} />;
    }
    ```
  - Для `Button.jsx`:
    ```jsx
    import React from 'react';

    export default function Button({ className, onClick, color, text }) {
        return (
            <button className={`${className} ${color} text-black font-semibold py-2 rounded`} onClick={onClick}>
                {text}
            </button>
        );
    }
    ```

---

## Почему это подходит для школьников?

1. **Логичный порядок**: Начинаем с базового `App.jsx`, добавляем компоненты (`Card`, `Column`, `Board`), затем интерактивность (создание, фильтры, модалка).
2. **Простота**: Код разбит на маленькие блоки, которые легко вставлять в указанные места.
3. **Интерактивность**: Каждый этап дает результат (заголовок, карточка, колонка, новая карточка, фильтры, модалка).
4. **Образовательная ценность**: Учатся создавать React-компоненты и работать с состояниями без сложных концепций.
5. **Весело**: Добавление карточек, фильтрация и редактирование увлекают.

---

Если нужно что-то уточнить, упростить или добавить (например, примеры `Input.jsx`/`Button.jsx` или анимации), дайте знать, и я доработаю!