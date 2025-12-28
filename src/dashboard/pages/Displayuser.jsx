import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Row,
  Card,
  Space,
  Typography,
  Tag,
  message,
  Form,
  Input,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const API = "http://localhost:8000";

export const User = () => {
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  /* ================= FETCH USERS ================= */
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/users`);
      const data = await res.json();
      setUsers(data);
    } catch {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ================= DELETE USER ================= */
  const deleteUser = async (id, name) => {
    if (!window.confirm(`Delete user ${name}?`)) return;

    try {
      const res = await fetch(`${API}/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      message.success("User deleted successfully");
      loadUsers();
    } catch {
      message.error("Failed to delete user");
    }
  };

  /* ================= OPEN EDIT MODAL ================= */
  const openEditModal = (user) => {
    setEditUser(user);

    // Convert DOB to YYYY-MM-DD string
    const dobString = user.dob ? new Date(user.dob).toISOString().split("T")[0] : "";

    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      phoneNo: user.phoneNo,
      dob: dobString, // ✅ Set as YYYY-MM-DD string
      address: user.address,
      username: user.username,
      email: user.email,
    });

    setOpenEdit(true);
  };

  /* ================= UPDATE USER ================= */
  const updateUser = async (values) => {
    try {
      const res = await fetch(`${API}/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          dob: values.dob, // already YYYY-MM-DD string
        }),
      });

      if (!res.ok) throw new Error();

      message.success("User updated successfully");
      setOpenEdit(false);
      loadUsers();
    } catch {
      message.error("Update failed");
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "Name",
      render: (_, r) => <Text strong>{r.firstName} {r.lastName}</Text>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (g) => <Tag color={g === "Male" ? "blue" : "pink"}>{g}</Tag>,
    },
    { title: "Phone", dataIndex: "phoneNo" },
    {
      title: "DOB",
      dataIndex: "dob",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    { title: "Username", dataIndex: "username" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined style={{ color: "#1677ff" }} onClick={() => { setViewUser(record); setOpenView(true); }} />
          <EditOutlined style={{ color: "green" }} onClick={() => openEditModal(record)} />
          <DeleteOutlined style={{ color: "red" }} onClick={() => deleteUser(record.id, record.firstName)} />
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ margin: 20, borderRadius: 12 }}>
      {/* ================= HEADER ================= */}
      <Row justify="space-between" align="middle">
        <Title level={3}>👥 All Users</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/dashboard/insertuser")}>
          Add User
        </Button>
      </Row>

      {/* ================= TABLE ================= */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        bordered
        loading={loading}
        pagination={{ pageSize: 8 }}
        style={{ marginTop: 20 }}
      />

      {/* ================= VIEW MODAL ================= */}
      <Modal title="User Information" open={openView} onCancel={() => setOpenView(false)} footer={null}>
        {viewUser && (
          <Space direction="vertical">
            <Text><b>Name:</b> {viewUser.firstName} {viewUser.lastName}</Text>
            <Text><b>Email:</b> {viewUser.email}</Text>
            <Text><b>Gender:</b> {viewUser.gender}</Text>
            <Text><b>Phone:</b> {viewUser.phoneNo}</Text>
            <Text><b>DOB:</b> {new Date(viewUser.dob).toLocaleDateString()}</Text>
            <Text><b>Address:</b> {viewUser.address}</Text>
            <Text><b>Username:</b> {viewUser.username}</Text>
          </Space>
        )}
      </Modal>

      {/* ================= EDIT MODAL ================= */}
      <Modal title="Edit User" open={openEdit} onCancel={() => setOpenEdit(false)} footer={null} width={700}>
        <Form layout="vertical" form={form} onFinish={updateUser}>
          <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="phoneNo" label="Phone No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>

          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Update User
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};
