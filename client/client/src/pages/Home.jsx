import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import gql from "graphql-tag";
import React from "react";
import { List, Avatar, Space, Card, Typography } from "antd";
import { MessageOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = () => {
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
    <List
      itemLayout="vertical"
      size="large"
      style={{ display: "flex" }}
      dataSource={posts}
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
          <Card style={{ width: 300, maxHeight: 180, marginTop: 16 }}>
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
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      createdAt
      username
      body
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      likeCount
    }
  }
`;

export default Home;
