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
import clientAxios from "../config/axios";
import Swal from "sweetalert2";

//HELPERS
const successMsg = (msg) => {
  Swal.fire({
    icon: "success",
    text: msg,
  });
};
const errorMsg = () => {
  Swal.fire({
    icon: "error",
    text: "An error ocurred!!!",
  });
};

//CREATE A POST
export function addPostAction(post) {
  return async (dispatch) => {
    dispatch(startAddPost());
    try {
      await clientAxios.post("/posts", post);
      dispatch(addPost(post));
      successMsg("Post created");
      getPostsAction();
    } catch (error) {
      console.log(error);
      dispatch(addPostError());
      errorMsg();
    }
  };
}
const startAddPost = () => ({
  type: START_ADD_POST,
  payload: true,
});
const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});
const addPostError = () => ({
  type: ERROR_ADD_POST,
  payload: true,
});
//-------------------------------------------------------------------------------//
//GET POSTS FROM DATA-BASE
export function getPostsAction() {
  return async (dispatch) => {
    dispatch(startGetPosts());
    try {
      const response = await clientAxios.get(
        "/posts"
      );
      dispatch(getPosts(response.data));
    } catch (error) {
      console.log(error);
      dispatch(getPostsError);
      errorMsg();
    }
  };
}
const startGetPosts = () => ({
  type: START_GET_POSTS,
  payload: true,
});
const getPosts = (productos) => ({
  type: GET_POSTS,
  payload: productos,
});
const getPostsError = () => ({
  type: GET_POSTS_ERROR,
  payload: true,
});
//-------------------------------------------------------------------------------//
//DELETE POST BY ID
export function deletePostAction(id) {
  return async (dispatch) => {
    dispatch(catchPostToDelete(id));
    try {
      await clientAxios.delete(
        `/posts/${id}`
      );
      dispatch(deletePost(id));
      successMsg("Post deleted");
      getPostsAction();
    } catch (error) {
      console.log(error);
      dispatch(errorDeletePost());
      errorMsg();
    }
  };
}
const catchPostToDelete = (id) => ({
  type: CATCH_POST_DELETE,
  payload: id,
});

const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});

const errorDeletePost = () => ({
  type: ERROR_DELETE_POST,
  payload: true,
});

//-------------------------------------------------------------------------------//
//CATCH POST TO UPDATE
export function catchPostToUpdateAction(post) {
  return async (dispatch) => {
    dispatch(catchPostToUpdate(post));
  };
}
const catchPostToUpdate = (post) => ({
  type: CATCH_POST_UPDATE,
  payload: post,
});
//UPDATE POST
export function editPostAction(post) {
  return async (dispatch) => {
    dispatch(startEditPost());
    try {
      await clientAxios.put(
        `/posts/${post.id}`,
        post
      );
      dispatch(editPost(post));
      getPostsAction();
      successMsg("Post edited");
    } catch (error) {
      console.log(error);
      dispatch(editPostError());
      errorMsg();
    }
  };
}
const startEditPost = () => ({
  type: START_UPDATE_POST,
});
const editPost = (producto) => ({
  type: UPDATE_POST,
  payload: producto,
});
const editPostError = () => ({
  type: ERROR_UPDATE_POST,
  payload: true,
});

//-------------------------------------------------------------------------------//
//CATCH POST TO READ
export function catchPostToReadAction(post) {
  return async (dispatch) => {
    dispatch(catchPostToRead(post));
  };
}
const catchPostToRead = (post) => ({
  type: CATCH_POST_READ,
  payload: post,
});
//CANCEL POST TO READ
export const cancelPostToReadAction = () => ({
  type: CANCEL_POST_READ,
});
