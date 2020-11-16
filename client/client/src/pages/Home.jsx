import { useQuery } from "@apollo/react-hooks";
import React, { memo, useContext, useState } from "react";
import { List, Avatar, Space, Card, Typography, Button } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { parseData } from "../utils/parseData";
import Modal from "../components/Modal/Modal";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
const { Meta } = Card;
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = memo(({ history }) => {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const constshowModal = () => {
    setVisible(true);
  };

  const { data } = useQuery(FETCH_POSTS_QUERY);

  if (!data) {
    return "loading";
  }

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
                <Button type="primary" onClick={constshowModal}>
                  Добавить пост
                </Button>
                <Modal visible={visible} setVisible={setVisible} />
              </>
            ) : (
              <div style={{ fontWeight: "500" }}>
                Чтобы добавить пост нужно авторизоваться!
              </div>
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
            <Card
              hoverable
              style={{
                width: 350,
                maxHeight: 200,
                height: "100%",
                marginTop: 25,
              }}
            >
              <Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <>
                    <div>{username}</div>
                    <div style={{ color: "#bdbaba" }}>
                      Дата: {parseData(createdAt)}
                    </div>
                  </>
                }
                description={
                  <Paragraph
                    underline={true}
                    strong
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
                <Link className="link__info" to={`/post/${id}`}>
                  Подробнее
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <LikeButton user={user} post={{ id, likes, likeCount }} />

                <span
                  onClick={() => history.push(`/post/${id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <IconText
                    icon={MessageOutlined}
                    text={commentCount}
                    key="list-vertical-message"
                  />
                </span>

                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
});

export default Home;
