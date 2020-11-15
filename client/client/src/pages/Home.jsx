import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { List, Avatar, Space, Card, Typography, Button } from "antd";
import { MessageOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Modal from "../components/Modal/Modal";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const { Meta } = Card;
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = () => {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const constshowModal = () => {
    setVisible(true);
  };

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (!data) {
    return "loading";
  }

  const likePost = () => {};
  const commentOnPost = () => {
    console.log("object");
  };
  const { getPosts: posts } = data;

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        header={
          <div
            style={{
              zIndex: "10",
              textAlign: "center",
              borderBottom: "none",
              paddingTop: "0",
              paddingBottom: "0",
            }}
          >
            {user ? (
              <>
                <Button onClick={constshowModal}>Добавить пост</Button>
                <Modal visible={visible} setVisible={setVisible} />
              </>
            ) : (
              <div>Чтобы добавить пост нужно авторизоваться!</div>
            )}
          </div>
        }
        renderItem={({
          body,
          createdAt,
          id,
          username,
          likeCount,
          commentCount,
          likes,
        }) => (
          <List.Item key={id}>
            <Card style={{ width: 350, maxHeight: 180, marginTop: 25 }}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <>
                    <div>{username}</div>
                    <div>
                      {/* {createdAt} */}
                      time
                    </div>
                  </>
                }
                description={
                  <Paragraph
                    ellipsis={{
                      rows: 2,
                      expandable: false,
                    }}
                  >
                    {body}
                  </Paragraph>
                }
              />
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <Link to={`/post/${id}`}>Подробнее</Link>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <span onClick={likePost} style={{ cursor: "pointer" }}>
                  <IconText
                    icon={LikeOutlined}
                    text={likeCount}
                    key="list-vertical-like-o"
                  />
                </span>
                <span onClick={commentOnPost} style={{ cursor: "pointer" }}>
                  <IconText
                    icon={MessageOutlined}
                    text={commentCount}
                    key="list-vertical-message"
                  />
                </span>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
