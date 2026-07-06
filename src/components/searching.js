import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(["skipEmptyTargetValues"], [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]);
    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        let result;
        const search = state.search;
        
        if (!Number.isNaN(Number(search)) && (search !== undefined) && (search !== "")) {
            if (search[0] === '0') {
                const date0 = state.search[0];
                const date = Number(state.search);
                state.date = date0 + String(date);
                result = data.filter(row => compare(row, state));
            } else if (Number(state.search) !== undefined && search[0] !== '0' && !Number.isNaN(Number(state.search))) {
                const date = Number(state.search);
                state.date = String(date);
                result = data.filter(row => compare(row, state));
            }
        } else if ((state.search !== undefined) && (state.search !== "")) {
            const stateCopy = Object.assign({}, state);
            state.customer = state.search;
            stateCopy.seller = state.search;
            const costumerFilter = data.filter(row => compare(row, state));
            const sellerFilter = data.filter(row => compare(row, stateCopy));
            const combinedUnique = [...new Set([...costumerFilter, ...sellerFilter])];
            result = combinedUnique;
        } else {
            result = data;
        }
        return result;
    }
}