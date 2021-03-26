import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostAction, getPostsAction } from "../actions/postsActions";

const CreatePost = () => {
  //PROVIDER
  const dispatch = useDispatch();
  const addPost = (post) => {
    dispatch(addPostAction(post));
  };
  //LOCAL STATES
  const [post, dataPost] = useState({
    title: "",
    body: "",
  });
  const [alert, showAlert] = useState(false);
  const [alertB, showAlertB] = useState(false);
  const handleChange = (e) => {
    dataPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const { title, body } = post;
  //SUBMIT POST
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      showAlert(true);
      setTimeout(() => {
        showAlert(false);
      }, 2000);
      return;
    }
    if (body.trim() === "") {
      showAlertB(true);
      setTimeout(() => {
        showAlertB(false);
      }, 2000);
      return;
    }
    addPost(post);
    dataPost({
      title: "",
      body: "",
    });
    dispatch(getPostsAction());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="column is-12-mobile is-6 has-background-dark p-5"
    >
      <div className="field">
        <h1 className="title has-text-white">CREATE A POST</h1>
      </div>
      <div className="field">
        <label className="label has-text-white">Title</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            placeholder="Text input"
            name="title"
            value={title}
          />
        </div>
      </div>
      {alert ? (
        <div className="field">
          <p className="help is-danger">Title is required</p>
        </div>
      ) : null}
      <div className="field">
        <label className="label has-text-white">Post</label>
        <div className="control">
          <textarea
            onChange={handleChange}
            className="textarea"
            placeholder="Write a post"
            name="body"
            value={body}
          ></textarea>
        </div>
      </div>
      {alertB ? (
        <div className="field">
          <p className="help is-danger">body is required</p>
        </div>
      ) : null}
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-warning has-text-black">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
