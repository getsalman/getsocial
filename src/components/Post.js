import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Post = (props) => {
  const post = props.post;
  const date = new Date(post.createdDate);
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Link
      onClick={props.onClick}
      to={`/post/${post._id}`}
      className="list-group-item list-group-item-action"
    >
      <img className="avatar-tiny" src={post.author.avatar} />{" "}
      <strong>{post.title}</strong>{" "}
      <span className="text-muted small">
        {!props.noAuthor && <Fragment> by {post.author.username}</Fragment>} on{" "}
        {dateFormatted}{" "}
      </span>
    </Link>
  );
};

export default Post;
