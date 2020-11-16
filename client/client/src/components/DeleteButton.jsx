import {
  DeleteColumnOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Popconfirm, Space } from "antd";
import gql from "graphql-tag";
import React from "react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, commentId, callback }) => {
  const mutation = commentId ? DELETE_COMMENT_MUTATUON : DELETE_POST_MUTATUON;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        // data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        });
      }

      if (callback) {
        callback();
      }
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <span style={{ cursor: "pointer" }}>
      <Popconfirm
        onConfirm={deletePostOrMutation}
        title="Точно хотите удалить?"
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      >
        <a href="#">Удалить</a>
      </Popconfirm>
    </span>
  );
};

const DELETE_POST_MUTATUON = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_MUTATUON = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
