import { combineReducers } from "redux";
import {
  SET_FILTER,
  FETCH_LAUNCHES_REQUEST,
  FETCH_LAUNCHES_SUCCESS,
  FETCH_LAUNCHES_FAILURE,
  SET_LIMIT,
  SET_PAGE,
  REMOVE_FILTER,
} from "./actions";

const getQueryParam = (param) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
};

const initialState = {
  filter: getQueryParam("filter") || "",
  launches: {
    launches: [],
    totalCount: 0,
  },
  loading: false,
  error: null,
  page: 1,
  limit: 10,
};

const filterReducer = (state = initialState.filter, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    case REMOVE_FILTER:
      return "";
    default:
      return state;
  }
};

const launchesReducer = (state = initialState.launches, action) => {
  switch (action.type) {
    case FETCH_LAUNCHES_SUCCESS:
      console.log(action.payload.data, "action");
      return {
        ...state,
        launches: action.payload.data,
        totalCount: action.payload.totalCount,
      };
    default:
      return state;
  }
};

const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case FETCH_LAUNCHES_REQUEST:
      return true;
    case FETCH_LAUNCHES_SUCCESS:
    case FETCH_LAUNCHES_FAILURE:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case FETCH_LAUNCHES_FAILURE:
      return action.payload;
    case FETCH_LAUNCHES_REQUEST:
    case FETCH_LAUNCHES_SUCCESS:
      return null;
    default:
      return state;
  }
};
const pageReducer = (state = initialState.page, action) => {
  switch (action.type) {
    case SET_FILTER:
      return 1;
    case SET_PAGE:
      return action.payload;
    default:
      return state;
  }
};

const limitReducer = (state = initialState.limit, action) => {
  switch (action.type) {
    case SET_LIMIT:
      return action.payload;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  filter: filterReducer,
  launches: launchesReducer,
  loading: loadingReducer,
  error: errorReducer,
  page: pageReducer,
  limit: limitReducer,
});

export default rootReducer;
