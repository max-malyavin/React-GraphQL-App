import { LikeOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Space } from "antd";
import gql from "graphql-tag";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IconText = ({ icon, text }) => {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
};

const LikeButton = memo(({ post: { id, likes, likeCount }, user }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (
      user &&
      likes &&
      likes.find((like) => like.username === user.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  const likeButton = user ? (
    liked ? (
      <IconText
        icon={LikeOutlined}
        text={likeCount}
        key="list-vertical-like-o"
      />
    ) : (
      <IconText
        icon={LikeOutlined}
        text={likeCount}
        key="list-vertical-like-o"
      />
    )
  ) : (
    <Link to="/login">
      <IconText
        icon={LikeOutlined}
        text={likeCount}
        key="list-vertical-like-o"
      />
    </Link>
  );
  return (
    <span
      onClick={user && likePost}
      style={{
        cursor: "pointer",
        color: `${liked ? "blue" : "black "}`,
      }}
    >
      {likeButton}
    </span>
  );
});

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
