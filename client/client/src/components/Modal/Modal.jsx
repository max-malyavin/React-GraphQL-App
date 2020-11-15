import { useMutation } from "@apollo/react-hooks";
import { Button, Form, Input } from "antd";

import { Modal as ModalAntd } from "antd";
import gql from "graphql-tag";
import React, { useState } from "react";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

const Modal = ({ visible, setVisible }) => {
  const [values, setValues] = useState({});

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      setVisible(false);
    },
  });

  const [form] = Form.useForm();
  const handleOk = (e) => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values);
    setValues(values);
    createPost();
    form.resetFields();
  };
  return (
    <ModalAntd
      title="Добавление поста"
      visible={visible}
      onOk={handleOk}
      onCancel={handleOk}
      footer={[
        <Button key="back" onClick={handleOk}>
          Отмена
        </Button>,
        <Button
          key="submit"
          loading={loading}
          onClick={() => form.submit()}
          disabled={loading}
          type="primary"
        >
          Добавить
        </Button>,
      ]}
    >
      <Form onFinish={onFinish} form={form} style={{ width: "100%" }}>
        <Form.Item
          name="body"
          hasFeedback
          rules={[{ required: true, message: "Пустое поле?!" }]}
        >
          <Input.TextArea
            size="large"
            // prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Текст"
            rows={4}
          />
        </Form.Item>
      </Form>
    </ModalAntd>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default Modal;
