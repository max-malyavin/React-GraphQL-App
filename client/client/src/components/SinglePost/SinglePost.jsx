import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  MessageOutlined,
} from "@ant-design/icons";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useContext, createElement, useState } from "react";
import { AuthContext } from "../../context/auth";
import DeleteButton from "../DeleteButton";
import LikeButton from "../LikeButton";
import {
  Card,
  Avatar,
  Comment,
  Tooltip,
  Space,
  Form,
  Input,
  Button,
} from "antd";
import { parseData } from "../../utils/parseData";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const { Meta } = Card;

const SinglePost = (props) => {
  const [form] = Form.useForm();

  const [comment, setComment] = useState("");

  const postId = props.match.params.id;
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {},
    variables: {
      postId,
      body: comment,
    },
  });

  if (!data) {
    return "loading";
  }
  const deleteButtonCallback = () => {
    props.history.push("/");
  };
  const {
    id,
    body,
    username,
    createdAt,
    comments,
    likes,
    likeCount,
    commentCount,
  } = data.getPost;
  const onFinish = (values) => {
    setComment(values);
    submitComment();
    form.resetFields();
  };

  return (
    <div
      style={{
        margin: "0 auto",
      }}
    >
      <Card
        style={{ width: 500 }}
        actions={[
          <LikeButton user={user} post={{ id, likes, likeCount }} />,
          <IconText
            icon={MessageOutlined}
            text={commentCount}
            key="list-vertical-message"
          />,
          <>
            {user && user.username === username && (
              <DeleteButton postId={id} callback={deleteButtonCallback} />
            )}
          </>,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={username}
          description={body}
        />
      </Card>

      {user && (
        <div style={{ marginTop: "30px" }}>
          <Form onFinish={onFinish} form={form} style={{ width: "100%" }}>
            <Form.Item
              name="body"
              hasFeedback
              rules={[{ required: true, message: "Пустое поле?!" }]}
            >
              <Input.TextArea
                size="large"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Текст"
                rows={3}
              />
            </Form.Item>
            <Button
              onClick={onFinish}
              disabled={comment == ""}
              key="submit"
              type="primary"
            >
              Добавить
            </Button>
          </Form>
        </div>
      )}

      <div>
        {comments.length ? (
          comments.map((comment) => {
            return (
              <Comment
                style={{
                  width: "300px",
                  padding: "10px",
                }}
                author={<b>{comment.username}</b>}
                content={
                  <>
                    <p>{comment.body}</p>
                    <span style={{ textAlign: "right" }}>
                      {user && user.username === comment.username && (
                        <DeleteButton postId={id} commentId={comment.id} />
                      )}
                    </span>
                  </>
                }
                datetime={
                  <Tooltip title={"Дата"}>{parseData(createdAt)}</Tooltip>
                }
              ></Comment>
            );
          })
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Комментариев нет!
          </div>
        )}
      </div>
    </div>
  );
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export default SinglePost;
