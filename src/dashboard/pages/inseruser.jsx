import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";

function InsertUser() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 🔒 Auth Guard (same pattern as dashboard)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // ✅ Submit Handler (fetch like Navbar)
  const handleInsertUser = async (values) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch("http://localhost:8000/insertuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          phoneNo: values.phoneNo,
          dob: values.dob,
          address: values.address,
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Insert failed");
      }

      message.success("User inserted successfully");
      form.resetFields();

    } catch (error) {
      console.error(error);
      message.error("Failed to insert user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Insert New User</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleInsertUser}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Enter first name" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Enter last name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter email" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Select gender" }]}
            >
              <select style={{ width: "100%", height: 32 }}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Phone No"
              name="phoneNo"
              rules={[{ required: true, message: "Enter phone number" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true, message: "Select DOB" }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Enter address" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Enter username" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter password" }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>

          
        </Row>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Accept agreement")),
            },
          ]}
        >
          <Checkbox>I have read all the information</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Insert User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default InsertUser;
