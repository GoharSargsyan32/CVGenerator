import React, { useState } from "react";
import { Steps, Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CVPreview from "./CVPreview";

const { Step } = Steps;

const StepsForm = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    profile: {},
    education: "",
    skills: "",
    projects: "",
    social: "",
  });

  const steps = [
    {
      title: "Profile Section",
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => handleFormSubmit("profile", values)}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter your first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="profileImage" label="Profile Image">
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent auto upload
              onChange={(info) => handleFileUpload(info)}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save and Continue
          </Button>
        </Form>
      ),
    },
    {
      title: "Education Section",
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => handleFormSubmit("education", values)}
        >
          <Form.Item
            name="education"
            label="Education"
            rules={[{ required: true, message: "Please enter your education" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save and Continue
          </Button>
        </Form>
      ),
    },
    {
      title: "Skills Section",
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => handleFormSubmit("skills", values)}
        >
          <Form.Item
            name="skills"
            label="Skills"
            rules={[{ required: true, message: "Please enter your skills" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save and Continue
          </Button>
        </Form>
      ),
    },
    {
      title: "Projects Section",
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => handleFormSubmit("projects", values)}
        >
          <Form.Item
            name="projects"
            label="Projects"
            rules={[{ required: true, message: "Please enter your projects" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save and Continue
          </Button>
        </Form>
      ),
    },
    {
      title: "Social Section",
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => handleFormSubmit("social", values)}
        >
          <Form.Item
            name="social"
            label="Social Links"
            rules={[{ required: true, message: "Please enter your social links" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Generate CV
          </Button>
        </Form>
      ),
    },
  ];

  const handleFormSubmit = (section, values) => {
    setFormData({ ...formData, [section]: values });
    setCurrent(current + 1);
  };

  const handleFileUpload = (info) => {
    const file = info.file.originFileObj || info.file;
    if (!file) {
      message.error("No file selected!");
      return;
    }

    if (!file.type.startsWith("image/")) {
      message.error("Please upload a valid image file!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevData) => ({
        ...prevData,
        profile: { ...prevData.profile, profileImage: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const restartForm = () => {
    setFormData({
      profile: {},
      education: "",
      skills: "",
      projects: "",
      social: "",
    });
    setCurrent(0);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 20 }}>
        {current < steps.length ? steps[current].content : null}
        {current === steps.length && (
          <CVPreview data={formData} onRestart={restartForm} />
        )}
      </div>
    </div>
  );
};

export default StepsForm;
