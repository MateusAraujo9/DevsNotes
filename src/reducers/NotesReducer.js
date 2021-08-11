const initialState = {
    list: [
        {title: 'Primeira Nota', body: 'Testando 1,2,3,....'}
    ]
};

export default (state = initialState, action) => {
    let newList = [...state.list];

    switch (action.type) {
        case 'ADD_NOTE':
            newList.push({
                title: action.payload.title,
                body: action.payload.body
            });
            break;
        case 'EDIT_NOTE':
            if (newList[action.payload.key]) {
                
                newList[action.payload.key] = {
                    title: action.payload.title,
                    body: action.payload.body
                }
            }
            break;
        case 'DELETE_NOTE':
            if (newList[action.payload.key]) {
                newList.splice(action.payload.key, 1);
            }
            break;
        
    }

    return { ...state, list: newList };
}