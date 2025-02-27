# Вложенный список чекбоксов

Реализация выпадающего списка с иерархическим чекбоксом по стандартам ARIA с дополненной навигацией (навигацией по стрелочкам).

## Стек технологий:

- **Vue.js**
- **TypeScript**
- **SCSS**
- **Vite**

## Структура:

Выпадающий список представляет собой кнопку, нажав на которую пользователю открывается список с иерархическими чекбоксами. Фокус при открытии списка автоматически перемещается на первый элемент, при закрытии - назад на кнопку.

## Навигация:

- **Tab, Shift+Tab** - Перемещение по активным элементам сайта, которые имеют фокус. При открытом выпадающем списке - закрывает его и перемещает фокус на следующий элемент.

- **Space** - Открыть выпадающий список или при фокусе на чекбоксе - активировать его.

- **Arrow Up/Arrow Down** - Перемещение по чекбоксам внутри списка.