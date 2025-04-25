# Мастер-класс "Kanban Board"

В этом мастер-классе мы создадим Kanban-доску за 15 минут! Вы научитесь добавлять карточки, колонки, фильтровать задачи по меткам и редактировать их в модальном окне. Каждый этап добавляет новую часть приложения, и вы сразу увидите результат!

## Этап 0: Начальная заготовка
Проект уже настроен, и в нем есть файл `src/App.jsx`. Откройте его и запустите приложение (в CodeSandbox или с помощью `npm start`). Вы увидите:
- Заголовок "Добро пожаловать в Kanban Workshop!".
- Короткий текст с описанием.
- Интерактивную кнопку, которая считает, сколько раз вы на нее кликнули.

### Что происходит в `App.jsx`?
Файл `App.jsx` — это React-компонент, который определяет, что отображается на экране.

#### Ключевые элементы кода:
1. **JSX**:
   - JSX — это смесь JavaScript и HTML, которую React использует для описания интерфейса.
   - Например, `<h1 className="text-4xl font-bold text-black mb-4">` выглядит как HTML, но это JavaScript, который React превращает в элементы на странице.
   - В отличие от HTML, вместо `class` используется `className`, чтобы не конфликтовать с JavaScript.

2. **Хук `useState`**:
   - `useState` — это специальная функция React (хук), которая позволяет компоненту "запоминать" данные и обновлять их.
   - В строке `const [count, setCount] = useState(0);`:
      - `count` — это переменная, которая хранит число кликов (начинается с 0).
      - `setCount` — функция, которая обновляет `count` и заставляет React перерисовать компонент.
      - `useState(0)` задает начальное значение `count` равным 0.
   - Когда вы вызываете `setCount(count + 1)`, React обновляет `count` и заново рендерит компонент, показывая новое значение.

3. **Интерактивность**:
   - Функция `handleClick` вызывается, когда вы нажимаете на кнопку: `<button onClick={handleClick}>`.
   - Она увеличивает `count` на 1 с помощью `setCount(count + 1)`.
   - Значение `count` отображается в `<p>Ты кликнул: {count} раз</p>`, и React автоматически обновляет текст при каждом клике.

4. **Tailwind CSS**:
   - Tailwind CSS — это библиотека, где стили задаются через классы.
   - Например:
      - `min-h-screen` — делает элемент высотой во весь экран.
      - `bg-[#9BD2FF]` — задает голубой фон.
      - `text-4xl` — увеличивает размер текста.
      - `hover:bg-[#1E82C7]` — меняет цвет кнопки при наведении.
   - Классы комбинируются, чтобы быстро стилизовать элементы без написания CSS.

### Игра с начальным кодом
Попробуйте поэкспериментировать с `App.jsx`, чтобы понять React и Tailwind CSS:
1. **Измените текст**:
   - Найдите `<p className="text-lg text-gray-800 mb-6">` и замените текст на "Я готов создать Kanban-доску!".
   - Сохраните и посмотрите, как текст обновился.

2. **Поменяйте цвет фона**:
   - В `<div className="min-h-screen bg-[#9BD2FF] p-6 flex flex-col items-center">` замените `bg-[#9BD2FF]` на `bg-[#FF6347]` (оранжевый).
   - Проверьте, как изменился фон.

3. **Добавьте стиль кнопки**:
   - В `<button className="mt-2 px-4 py-2 bg-[#2499EC] text-white rounded hover:bg-[#1E82C7] transition">` добавьте `font-bold` к классам.
   - Кнопка станет жирной.

4. **Измени поведение счетчика**:
   - В функции `handleClick` замените `setCount(count + 1)` на `setCount(count + 2)`.
   - Теперь каждый клик будет увеличивать счетчик на 2!

5. **Добавьте свой текст**:
   - После `<p>Ты кликнул: {count} раз</p>` добавьте новый `<p>` с текстом, например:
     ```jsx
     <p className="text-lg text-black">Мой счетчик крутой!</p>
     ```
   - Проверьте, что текст появился.

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

export default function Column({ id, title, cards, cardProps, columnProps }) {
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
1. В начале файла, добавьте импорт `Column`:
   ```jsx
   import Column from "./components/Column.jsx";
   ```
2. Замените `labelList` на следующий код (добавляем массив `cards`):
   ```jsx
   const labelList = {
       urgent: {title: 'Срочная', color: 'bg-[#FFA3A6]'},
       none: {title: 'Нет метки', color: 'bg-gray-400'}
   };

   const initCards = [
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
       cards={initCards}
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
1. В начале файла, добавьте импорт `Board`:
   ```jsx
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

   const initCards = [
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
       cards={initCards}
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
1. В начале файла, добавьте импорт `useState` :
   ```jsx
   import { useState } from "react";
   ```

2. Замените `labelList`, `initialColumns` и `cards` на следующий код (добавляем состояния):
   ```jsx
   const labelList = {
       urgent: {title: 'Срочная', color: 'bg-[#FFA3A6]'},
       none: {title: 'Нет метки', color: 'bg-gray-400'}
   };
   
   const initialColumns = [
        { id: 'first', title: 'Новые' }
   ];
    
   const initCards = [
        {
            cardId: crypto.randomUUID(),
            column: 'first',
            title: "Сделать дизайн",
            description: "Нарисовать UI для главной страницы",
            createdAt: "2025-04-17T12:00:00Z",
            label: "urgent"
        }
    ];

   const [columns, setColumns] = useState(initialColumns);
   const [cards, setCards] = useState(initCards);
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
3. Внутри `<Board>`, замените `boardProps` и `columnProps` на:
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
2. В `return`, после состояния `newCardTitle`, добавьте:
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
                <SectionHeader icon={Bars3BottomLeftIcon} text="Описание" />
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
                <SectionHeader icon={WrenchIcon} text="Действия" />
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

**Изменения в Card.jsx**:
1. В `return`, отредактируйте первый `<div>` - `<div className="card..."`. Должно получится вот так:
   ```jsx
   ...
   return (
   
   <div className="card bg-[#E1EFFB] hover:bg-[#E6F8FF] hover:scale-105"
             ~onClick={() => props.onCardClick(props.cardId)}>
      
       <div>
      ...
   ```


**Результат**: Кликните на карточку — откроется модальное окно. Измените название, описание или метку, нажмите "Сохранить" — карточка обновится. Нажмите "Удалить" — карточка исчезнет.