import { filterMapping } from "../utils/utils";

export const SET_FILTER = "SET_FILTER";
export const FETCH_LAUNCHES_REQUEST = "FETCH_LAUNCHES_REQUEST";
export const FETCH_LAUNCHES_SUCCESS = "FETCH_LAUNCHES_SUCCESS";
export const FETCH_LAUNCHES_FAILURE = "FETCH_LAUNCHES_FAILURE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_PAGE = "SET_PAGE";
export const SET_ADDITIONAL_FILTER = "SET_ADDITIONAL_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";

export const setFilter = (filter) => {
  return (dispatch, getState) => {
    const currentUrl = new URL(window.location.href);
    const baseUrl = currentUrl.origin + currentUrl.pathname.replace(/\/$/, "");
    let newUrl = "";
    if (filter === "") {
      newUrl = `${baseUrl}`;
    } else {
      newUrl = `${baseUrl}?filter=${filter}`;
    }

    window.history.pushState(null, "", newUrl);

    dispatch({
      type: SET_FILTER,
      payload: filter,
    });
    dispatch(fetchLaunchesRequest());
  };
};

export const removeFilter = () => {
  return (dispatch, getState) => {
    const currentUrl = new URL(window.location.href);
    const baseUrl = currentUrl.origin + currentUrl.pathname.replace(/\/$/, "");
    const newUrl = baseUrl;

    window.history.pushState(null, "", newUrl);

    dispatch({
      type: REMOVE_FILTER,
    });
    dispatch(fetchLaunchesRequest());
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export const setLimit = (limit) => {
  return {
    type: SET_LIMIT,
    payload: limit,
  };
};

export const fetchLaunchesRequest = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { page, limit } = state;

    let url = "https://api.spacexdata.com/v3/launches";
    const filter = state.filter;

    console.log(filter, "filter");

    if (filter === filterMapping[2]) {
      url += `/upcoming`;
    } else if (filter === filterMapping[3]) {
      url += `?launch_success=true`;
    } else if (filter === filterMapping[4]) {
      url += `?launch_success=false`;
    }

    if (filter === filterMapping[1] || !filter) {
      url += `?limit=${limit}&offset=${limit * (page - 1)}`;
    } else {
      if (url.includes("?")) {
        url += `&limit=${limit}&offset=${limit * (page - 1)}`;
      } else {
        url += `?limit=${limit}&offset=${limit * (page - 1)}`;
      }
    }

    dispatch({ type: FETCH_LAUNCHES_REQUEST });
    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      const totalCount = parseInt(response.headers.get("Spacex-Api-Count"), 10);
      dispatch({ type: FETCH_LAUNCHES_SUCCESS, payload: { data, totalCount } });
    } catch (error) {
      dispatch({ type: FETCH_LAUNCHES_FAILURE, payload: error.message });
    }
  };
};
