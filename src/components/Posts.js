import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getPostsAction,
  deletePostAction,
  catchPostToUpdateAction,
  catchPostToReadAction,
} from "../actions/postsActions";

const Posts = () => {
  const history = useHistory();
  //PROVIDER
  const dispatch = useDispatch();
  useEffect(() => {
    const showPosts = () => {
      dispatch(getPostsAction());
    };
    showPosts();
    // eslint-disable-next-line
  }, []);
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  //DELETE POST
  const deletePost = (id) => {
    dispatch(deletePostAction(id));
  };
  //CATCH POST TO UPDATE
  const toEditPost = (post) => {
    dispatch(catchPostToUpdateAction(post));
    history.push(`/edit/${post.id}`);
  };
  //CATCH POST TO READ
  const toReadPost = (post) => {
    dispatch(catchPostToReadAction(post));
    history.push(`/read/${post.id}`);
  };
  return (
    <div className="column is-12-mobile is-8">
      {loading ? <p className="has-text-black title is-1">...LOADING</p> : null}
      <p className="title has-text-centered has-text-white has-background-dark is-1">
        POSTS
      </p>
      <div className="columns is-multiline">
        {posts.length === 0
          ? "There are not posts"
          : posts.map((data) => (
              <div
                key={data.id}
                className="card has-background-dark column is-12-mobile m-2"
              >
                <div className="card-content">
                  <div className="content">
                    <p className="title is-6 has-text-white">
                      {data.title.toUpperCase()}
                    </p>
                  </div>
                </div>
                <footer className="card-footer">
                  <p className="card-footer-item">
                    <button
                      className="button is-small is-warning"
                      onClick={() => toEditPost(data)}
                    >
                      EDIT
                    </button>
                  </p>
                  <p className="card-footer-item">
                    <button
                      className="button is-small is-link"
                      onClick={() => toReadPost(data)}
                    >
                      READ
                    </button>
                  </p>
                  <p className="card-footer-item">
                    <button
                      className="button is-small is-danger"
                      onClick={() => deletePost(data.id)}
                    >
                      DELETE
                    </button>
                  </p>
                </footer>
              </div>
            ))}
        {error ? (
          <p className="has-text-black title is-1">AN ERROR OCURRED</p>
        ) : null}
      </div>
    </div>
  );
};

export default Posts;
