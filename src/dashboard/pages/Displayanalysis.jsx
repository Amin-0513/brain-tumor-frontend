import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Card,
  Space,
  Typography,
  Tag,
  message,
  Image,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const API = "http://localhost:8000";

export const DisplayAnalysis = () => {
  const [analysis, setAnalysis] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ANALYSIS ================= */
  const loadAnalysis = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/allanalysis`);
      const data = await res.json();
      setAnalysis(data);
    } catch {
      message.error("Failed to load analysis data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "Prediction",
      dataIndex: "prediction",
      render: (p) => (
        <Tag color={p === "Tumor" ? "red" : "green"}>{p}</Tag>
      ),
    },
    {
      title: "Report",
      dataIndex: "report",
      ellipsis: true,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <EyeOutlined
          style={{ color: "#1677ff", fontSize: 18 }}
          onClick={() => {
            setViewData(record);
            setOpenView(true);
          }}
        />
      ),
    },
  ];

  return (
    <Card style={{ margin: 20, borderRadius: 12 }}>
      <Title level={3}>🧠 Tumor Analysis Results</Title>

      {/* ================= TABLE ================= */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={analysis}
        bordered
        loading={loading}
        pagination={{ pageSize: 8 }}
        style={{ marginTop: 20 }}
      />

      {/* ================= VIEW MODAL ================= */}
      <Modal
        title="Analysis Details"
        open={openView}
        onCancel={() => setOpenView(false)}
        footer={null}
        width={800}
      >
        {viewData && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Text>
              <b>Prediction:</b>{" "}
              <Tag color={viewData.prediction === "Tumor" ? "red" : "green"}>
                {viewData.prediction}
              </Tag>
            </Text>

            <Text><b>Report:</b></Text>
            <Text>{viewData.report}</Text>

            <Text><b>Original Image:</b></Text>
            <Image
              width={250}
              src={`data:image/png;base64,${viewData.image_base64}`}
            />

            <Text><b>XAI Image:</b></Text>
            <Image
              width={250}
              src={`data:image/png;base64,${viewData.xai_image_base64}`}
            />
          </Space>
        )}
      </Modal>
    </Card>
  );
};
