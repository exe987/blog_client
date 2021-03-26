import {
  START_GET_POSTS,
  GET_POSTS,
  GET_POSTS_ERROR,
  START_ADD_POST,
  ADD_POST,
  ERROR_ADD_POST,
  CATCH_POST_DELETE,
  DELETE_POST,
  ERROR_DELETE_POST,
  CATCH_POST_UPDATE,
  START_UPDATE_POST,
  UPDATE_POST,
  ERROR_UPDATE_POST,
  CATCH_POST_READ,
  CANCEL_POST_READ,
} from "../types/index";

const initialState = {
  posts: [],
  my_posts: [],
  postToDelete: null,
  postToEdit: null,
  postToRead: null,
  error: null,
  loading: false,
  productoEliminar: null,
  productoEditar: null,
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case START_GET_POSTS:
    case START_UPDATE_POST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: false,
      };
    case GET_POSTS_ERROR:
    case ERROR_DELETE_POST:
    case ERROR_ADD_POST:
    case ERROR_UPDATE_POST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case START_ADD_POST:
      return {
        ...state,
        ...state,
        loading: true,
        error: false,
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        my_posts: [...state.my_posts, action.payload],
        error: false,
      };
    case CATCH_POST_DELETE:
      return {
        ...state,
        postToDelete: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        my_posts: state.my_posts.filter(
          (post) => post.id !== state.postToDelete
        ),
        postToDelete: null,
      };
    case CATCH_POST_UPDATE:
      return {
        ...state,
        postToEdit: action.payload,
      };
    case UPDATE_POST:
      return {
        ...state,
        postToEdit: null,
        my_posts: state.my_posts.map((post) =>
          post.id === action.payload.id ? (post = action.payload) : post
        ),
        loading: false,
        error: null,
      };
    case CATCH_POST_READ:
      return {
        ...state,
        postToRead: action.payload,
      };
    case CANCEL_POST_READ:
      return {
        ...state,
        postToRead: null,
      };
    default:
      return state;
  }
}
