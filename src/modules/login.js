const LOGIN = 'loginInfo/LOGIN';

export const login = () => ({
  type: LOGIN,
});

const initialState = {
  user: '',
};

export default function SessionProvider(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: 'hi',
      };
    default:
      return state;
  }
}
