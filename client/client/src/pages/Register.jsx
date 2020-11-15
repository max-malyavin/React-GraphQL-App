import React, { useState } from "react";
import openNotification from "../utils/openNotification";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
const { Title } = Typography;

const Register = (props) => {
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  const [values, setValues] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      openNotification({
        title: "Регистрация прошла успешна!",
        text: "Попробуйте войти в аккаунт!",
        type: "success",
        duration: 2,
      });
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
      openNotification({
        title: "Ошибка при создании",
        type: "error",
        duration: 2,
      });
    },
    variables: values,
  });
  
  const onFinish = (values) => {
    setValues(values);
    addUser();
    setErrors(null);
    form.resetFields();
  };
  return (
    <div className="login__inner">
      <Title>Регистрация</Title>
      <Form onFinish={onFinish} form={form} style={{ width: "100%" }}>
        <Form.Item
          hasFeedback
          name="email"
          rules={[
            {
              required: true,
              message: "Введите почту",
            },
            {
              pattern: "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}",
              message: "Введите корректно почту!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
            type="email"
          />
        </Form.Item>

        <Form.Item
          name="username"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите имя",
            },
            {
              pattern: `.{2}`,
              message: "Минимальная длинна 2 символа",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Ваше имя"
          />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
            {
              pattern: `.{3}`,
              message: "Минимальная длинна 3 символа",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Повторите пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Пароли не верны");
              },
            }),
          ]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Повторите пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            className="button"
            type="primary"
            size="large"
          >
            {loading ? "Выполняется регистрация" : "Зарегистрироваться"}
          </Button>
        </Form.Item>
        <div className="link">
          <Link className="link" to="/login">
            Войти в аккаунт
          </Link>
        </div>
        {errors && <Tag color="error">{errors}</Tag>}
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
