import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tag, Typography } from "antd";
import { gql, useMutation } from "@apollo/react-hooks";
import openNotification from "../utils/openNotification";
import { AuthContext } from "../context/auth";

const { Title } = Typography;

const Login = (props) => {
  const context = useContext(AuthContext);
  const [form] = Form.useForm();
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState({});
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data }) {
      openNotification({
        title: "Авторизация успешна!",
        type: "success",
        duration: 2,
      });
      context.login(data.login);
      props.history.push("/");
    },
    onError(err) {
      // setErrors(err.graphQLErrors[0] && err.graphQLErrors[0]);
      openNotification({
        title: "Ошибка при авторизации",
        type: "error",
        duration: 2,
      });
    },
    variables: values,
  });

  const onFinish = (values) => {
    setValues(values);
    loginUser();
    setErrors(null);
    form.resetFields();
  };

  return (
    <div className="login__inner">
      <Title>Логин</Title>
      <Form onFinish={onFinish} form={form} style={{ width: "100%" }}>
        <Form.Item
          name="username"
          hasFeedback
          rules={[{ required: true, message: "Введите имя!" }]}
          // rules={[
          //   { required: true, message: "Введите почту!" },
          //   {
          //     pattern: "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}",
          //     message: "Введите корректно почту!",
          //   },
          // ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            { required: true, message: "Введите пароль!" },
            {
              pattern: `.{3}`,
              message: "Минимальная длинна 3 символа",
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Пароль"
          />
        </Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="button"
          loading={loading}
        >
          {loading ? "Запрос выполняется" : "Войти в аккаунт"}
        </Button>
        <div className="link">
          <Link to="/register">Регистрация</Link>
        </div>
        {errors && <Tag color="error">{errors}</Tag>}
      </Form>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
