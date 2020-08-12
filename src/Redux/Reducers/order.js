const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: [],
  detailOrder: []
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ORDER':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };
    case 'GET_ID_ORDER':
      return {
        ...state,
        isLoading: false,
        isError: false,
        detailOrder: action.payload.data.data[0],
      };
    default:
      return state;
  }
};

export default order;
