// property-actions.js

import PropertyService from '../services/property.service';


export const FETCH_PROPERTIES_REQUEST = 'FETCH_PROPERTIES_REQUEST';
export const FETCH_PROPERTIES_SUCCESS = 'FETCH_PROPERTIES_SUCCESS';
export const FETCH_PROPERTIES_FAILURE = 'FETCH_PROPERTIES_FAILURE';
export const UPDATE_PROPERTY_REQUEST = 'UPDATE_PROPERTY_REQUEST';
export const UPDATE_PROPERTY_SUCCESS = 'UPDATE_PROPERTY_SUCCESS';
export const UPDATE_PROPERTY_FAILURE = 'UPDATE_PROPERTY_FAILURE';
export const TOGGLE_FAVORITE_REQUEST = 'TOGGLE_FAVORITE_REQUEST';
export const TOGGLE_FAVORITE_SUCCESS = 'TOGGLE_FAVORITE_SUCCESS';
export const TOGGLE_FAVORITE_FAILURE = 'TOGGLE_FAVORITE_FAILURE';
export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
export const SEARCH_PROPERTIES = 'SEARCH_PROPERTIES';



const fetchPropertiesRequest = () => ({
  type: FETCH_PROPERTIES_REQUEST
});

const fetchPropertiesSuccess = (properties) => ({
  type: FETCH_PROPERTIES_SUCCESS,
  payload: properties
});

const fetchPropertiesFailure = (error) => ({
  type: FETCH_PROPERTIES_FAILURE,
  payload: error
});

// Inside property-actions.js
export const fetchAllProperties = (page = 1, perPage = 6) => (dispatch) => {
  dispatch(fetchPropertiesRequest());
  PropertyService.getAllProperties(page, perPage)
    .then(response => {
      dispatch(fetchPropertiesSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchPropertiesFailure(error.message));
    });
};

const updatePropertyRequest = () => ({
  type: UPDATE_PROPERTY_REQUEST
});

const updatePropertySuccess = (property) => ({
  type: UPDATE_PROPERTY_SUCCESS,
  payload: property
});

const updatePropertyFailure = (error) => ({
  type: UPDATE_PROPERTY_FAILURE,
  payload: error
});

export const updateProperty = (propertyId, propertyData) => (dispatch) => {
  dispatch(updatePropertyRequest());
  PropertyService.updateProperty(propertyId, propertyData)
    .then(response => {
      dispatch(updatePropertySuccess(response.data));
    })
    .catch(error => {
      dispatch(updatePropertyFailure(error.message));
    });
};


const toggleFavoriteRequest = () => ({
  type: TOGGLE_FAVORITE_REQUEST
});

const toggleFavoriteSuccess = (status) => ({
  type: TOGGLE_FAVORITE_SUCCESS,
  payload: status
});

const toggleFavoriteFailure = (error) => ({
  type: TOGGLE_FAVORITE_FAILURE,
  payload: error
});



export const toggleFavorite = (propertyId, page) => (dispatch) => {
  dispatch(toggleFavoriteRequest());
  PropertyService.toggleFavoriteProperty(propertyId)
      .then(response => {
          dispatch(toggleFavoriteSuccess(response.data.message)); 
          dispatch(fetchAllProperties(page));
          // Assuming the API response contains a "status" that indicates "added" or "removed"
      })
      .catch(error => {
          dispatch(toggleFavoriteFailure(error.message));
      });
};


const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST
});

const fetchFavoritesSuccess = (properties) => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: properties
});

const fetchFavoritesFailure = (error) => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error
});

export const fetchFavorites = () => (dispatch) => {
  dispatch(fetchFavoritesRequest());
  PropertyService.getFavoriteProperties()
    .then(response => {
      dispatch(fetchFavoritesSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchFavoritesFailure(error.message));
    });
};


export const searchProperties = (params) => dispatch => {
  return PropertyService.searchProperties(params)
      .then(response => {
          dispatch({
              type: 'SEARCH_PROPERTIES',
              payload: response.data
          });
          return Promise.resolve();
      }, error => {
          // Handle error here
          return Promise.reject(error);
      });
};
