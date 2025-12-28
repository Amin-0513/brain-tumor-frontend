import React, { useState } from "react";
import { Modal, Form, Input, Checkbox, Button as AntButton, message } from "antd";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLoginSuccess = async (values) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // ✅ Save token & user info
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      localStorage.setItem("user_name", data.user_name);
      localStorage.setItem("user_id", data.user_id);

      message.success("Login successful");

      handleCloseModal();

      // ✅ Navigate to dashboard
      navigate("/dashboard/dashboardContent");

    } catch (error) {
      message.error("Login failed. Please check your email and password.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFailure = (errorInfo) => {
    console.error("Form validation failed:", errorInfo);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo Section */}
        <div className="navbar-left">
          <img src={logo} alt="NeuroDetect AI Logo" className="navbar-logo" />
          <span className="navbar-title">NeuroDetect AI</span>
        </div>

        {/* Login Button */}
        <button className="login-btn" onClick={handleOpenModal} aria-label="Login">
          <LogIn size={16} />
          <span>Login</span>
        </button>
      </nav>

      {/* Login Modal */}
      <Modal
        title="Login"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={handleLoginSuccess}
          onFinishFailed={handleLoginFailure}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <AntButton type="primary" htmlType="submit" block loading={loading}>
              Login
            </AntButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Navbar;
