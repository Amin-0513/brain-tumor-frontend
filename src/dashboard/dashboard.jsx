import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import {
  LogoutOutlined,
  AppstoreTwoTone,
  UserOutlined,
  LineChartOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import img1 from "../assets/images/cx.png";
import "./dashboard.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class DS extends React.Component {
  state = {
    collapsed: false,
    username: "",
  };

  componentDidMount() {
    const storedUsername = localStorage.getItem("user_name") || "Guest";
    this.setState({ username: storedUsername });
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  };

  render() {
    const { collapsed, username } = this.state;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{ backgroundColor: "rgb(3, 39, 39)" }}
        >
          <div className="logo" />

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ backgroundColor: "rgb(4, 38, 46)" }}
          >
            <Menu.Item
              key="1"
              icon={<AppstoreTwoTone />}
              style={{ marginTop: "50px" }}
            >
              <Link to="/dashboard/dashboardContent">Dashboard</Link>
            </Menu.Item>

            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">
                <Link to="/dashboard/insertuser">Insert User</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/dashboard/displayuser">Display Users</Link>
              </Menu.Item>
            </SubMenu>
             <SubMenu key="sub2" icon={<LineChartOutlined />} title="Report">
              <Menu.Item key="5">
                <Link to="/dashboard/analysis">Analysis</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/dashboard/displayanalysis">Display images</Link>
              </Menu.Item>
            </SubMenu>


           


            <SubMenu key="sub3" icon={<ClusterOutlined />} title="Model">
              <Menu.Item key="122">
                <Link to="#">Submit Model</Link>
              </Menu.Item>
              <Menu.Item key="44">
                <Link to="/dashboard/displaymodel">Display Model</Link>
              </Menu.Item>
            </SubMenu>

            

            <Menu.Item
              key="11"
              icon={<LogoutOutlined />}
              onClick={this.handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ padding: 0 }}>
            <Row>
              <Col span={18} />
              <Col span={6}>
                <Row align="middle">
                  <Col span={12} style={{ textAlign: "right" }}>
                    <img
                      src={img1}
                      alt="User avatar"
                      width="50"
                      height="50"
                      style={{
                        borderRadius: "50%",
                        marginTop: "8px",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <h2 style={{ marginLeft:"5px",marginTop:"-25px", color:"white"}}>{username}</h2>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
              borderRadius: "20px",
            }}
          >
            <Outlet />
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Design ©2026 Created by FYP
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default DS;
