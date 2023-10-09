// property-reducer.js

import {
    FETCH_PROPERTIES_REQUEST,
    FETCH_PROPERTIES_SUCCESS,
    FETCH_PROPERTIES_FAILURE,
    UPDATE_PROPERTY_REQUEST,
    UPDATE_PROPERTY_SUCCESS,
    UPDATE_PROPERTY_FAILURE,
    TOGGLE_FAVORITE_REQUEST,
    TOGGLE_FAVORITE_SUCCESS,
    TOGGLE_FAVORITE_FAILURE,
    FETCH_FAVORITES_REQUEST,
    FETCH_FAVORITES_SUCCESS,
    FETCH_FAVORITES_FAILURE,
    SEARCH_PROPERTIES
  } from '../actions/property';
  
  const initialState = {
    loading: false,
    properties: [],
    favorites: [],
    responseMessage: '' ,
    error: ''
  };
  
  const propertyReducer = (state = initialState, action) => {
    switch(action.type) {
      case FETCH_PROPERTIES_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_PROPERTIES_SUCCESS:
        return {
          loading: false,
          properties: action.payload,
          error: ''
        };
      case FETCH_PROPERTIES_FAILURE:
        return {
          loading: false,
          properties: [],
          error: action.payload
        };
      case UPDATE_PROPERTY_REQUEST:
        return {
            ...state,
            loading: true
        };
      case UPDATE_PROPERTY_SUCCESS:
        return {
            ...state,
            properties: state.properties.map(property =>
                property.id === action.payload.id ? action.payload : property
            )
        };
      case UPDATE_PROPERTY_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload
        };  
      case TOGGLE_FAVORITE_REQUEST:
        return {
            ...state,
            loading: true
        };
      case TOGGLE_FAVORITE_SUCCESS:
          // Assuming you're going to return the updated property from the backend.
          return {
              ...state,
              loading: false,
              properties: state.properties,
              responseMessage: action.payload
          };
      case TOGGLE_FAVORITE_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload
          };  
      case FETCH_FAVORITES_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_FAVORITES_SUCCESS:
        return {
          ...state,
          favorites: action.payload
        };
      case FETCH_FAVORITES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case SEARCH_PROPERTIES:
          return {
              ...state,
              properties: action.payload
          };
      default:
        return state;
    }
  };
  
  export default propertyReducer;
  