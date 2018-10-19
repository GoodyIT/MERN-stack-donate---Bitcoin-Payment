// Import Actions
import {
  TOGGLE_ADD_POST,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  FETCH_USERS,
  FETCH_USER,
  GET_CRYPTO,
  FETCH_USER_GUIDE,
  ADD_ORDERS,
  ADD_ERROR,
} from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  projects: [],
  crypto: {},
  token: '',
  errors: '',
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        ...state,
        showAddPost: !state.showAddPost,
      };
    case FETCH_PROJECTS:
      return {
        projects: action.projects,
      };
    case FETCH_USERS:
      return  {
        users: action.users,
      };
    case FETCH_USER:
      return  {
        res: action.res,
      };
    case FETCH_PROJECT:
      return {
        ...state,
        project: action.project,
      };
    case GET_CRYPTO:
      return {
        ...state,
        crypto: action.crypto,
      };
    case FETCH_USER_GUIDE:
      return {
        ...state,
        guide: action.guide,
      };
    case ADD_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      }
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default AppReducer;
