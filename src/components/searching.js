export function initSearching(searchField) {
    return (query, state, action) => {
        return state[searchField.name] ? Object.assign({}, query, { // проверяем, что в поле поиска было что-то введено
            search: state[searchField.name] // устанавливаем в query параметр
        }) : query;
    }
}