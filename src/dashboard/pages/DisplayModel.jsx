import React, { useEffect, useState } from "react";
import { Table, Card, Tag, Typography, message, Space, Button } from "antd";
import { EyeOutlined, SafetyOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const API = "http://localhost:8000";

/* ================= STATUS COLOR ================= */
const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "success":
      return "green";
    case "pending":
      return "orange";
    case "failed":
    case "error":
      return "red";
    default:
      return "blue";
  }
};

export const DisplayModel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifyLoadingId, setVerifyLoadingId] = useState(null);

  /* ================= FETCH FL DATA ================= */
  const loadFLData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/allfl`);
      if (!res.ok) throw new Error();
      const result = await res.json();
      setData(result);
    } catch {
      message.error("Failed to load FL data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFLData();
  }, []);

  /* ================= VERIFY API CALL ================= */
  const verifyModel = async (id) => {
    try {
      setVerifyLoadingId(id);
      const res = await fetch(`http://127.0.0.1:5003/documents/${id}`);
      if (!res.ok) throw new Error();
      message.success(`Model ${id} verified successfully`);
      loadFLData();
    } catch {
      message.error(`Verification failed for ${id}`);
    } finally {
      setVerifyLoadingId(null);
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      render: (u) => <Text strong>{u}</Text>,
    },
    {
      title: "File Path",
      dataIndex: "filepath",
      ellipsis: true,
    },
    {
      title: "Accuracy",
      dataIndex: "accuracy",
      render: (a) => `${(a * 100).toFixed(2)}%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (s) => <Tag color={statusColor(s)}>{s.toUpperCase()}</Tag>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space>
          {/* VIEW BUTTON */}


          {/* VERIFY BUTTON */}
          <Button
            type="primary"
            icon={<SafetyOutlined />}
            loading={verifyLoadingId === record.id}
            onClick={() => verifyModel(record.id)}
          >
            Verify
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ margin: 20, borderRadius: 12 }}>
      <Title level={3}>Federated Learning Model Data</Title>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        bordered
        pagination={{ pageSize: 8 }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};
