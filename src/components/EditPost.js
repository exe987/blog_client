import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPostAction } from "../actions/postsActions";

const EditPost = () => {
  const history = useHistory();
  //PROVIDER
  const dispatch = useDispatch();
  const editPost = (post) => {
    dispatch(editPostAction(post));
  };
  const postToEdit = useSelector((state) => state.posts.postToEdit);
  //LOCAL STATES
  const [post, dataPost] = useState({
    title: postToEdit.title,
    contain: postToEdit.body,
  });
  const [alert, showAlert] = useState(false);
  const [alertB, showAlertB] = useState(false);
  const handleChange = (e) => {
    dataPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const { title, contain } = post;
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
    if (contain.trim() === "") {
      showAlertB(true);
      setTimeout(() => {
        showAlertB(false);
      }, 2000);
      return;
    }
    postToEdit.title = title;
    postToEdit.body = contain;
    editPost(postToEdit);
    dataPost({
      title: "",
      contain: "",
    });
    history.push(`/`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="column is-12-mobile is-6 has-background-dark p-5"
    >
      <div className="field">
        <h1 className="title has-text-white">EDIT A POST</h1>
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
            name="contain"
            value={contain}
          ></textarea>
        </div>
      </div>
      {alertB ? (
        <div className="field">
          <p className="help is-danger">Contain is required</p>
        </div>
      ) : null}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-small is-warning has-text-black"
          >
            EDIT
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
