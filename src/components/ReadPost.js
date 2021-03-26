import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cancelPostToReadAction } from "../actions/postsActions";

const ReadPost = () => {
  //DATA PROVIDER
  const dispatch = useDispatch();
  const cancelReadPost = () => {
    dispatch(cancelPostToReadAction());
  };
  const postToRead = useSelector((state) => state.posts.postToRead);

  return (
    <div className="column is-12-mobile is-6 borde has-background-dark p-5">
      <h2 className="title has-text-centered has-text-white has-background-black is-3">
        {postToRead.title.toUpperCase()}
      </h2>
      <p className="has-text-white is-size-5 ">{postToRead.body}</p>
      <Link
        type="submit"
        className="button is-small is-warning has-text-black mt-4"
        to={"/"}
        onClick={() => cancelReadPost}
      >
        Go Home
      </Link>
    </div>
  );
};

export default ReadPost;
