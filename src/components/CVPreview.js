import React, { useState } from "react";
import { Card, Button, Typography } from "antd";

const CVPreview = ({ data, onRestart }) => {
  const { profile, education, skills, projects, social } = data;
  const [image, setImage] = useState();
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
  }
  reader.readAsDataURL(profile.profileImage.file);

  return (
    <div>
      <Typography.Title level={4}>CV</Typography.Title>
      <Card>
        <img
          src={image}
          alt="Profile"
          style={{ width: 100, height: 100, borderRadius: "50%", marginBottom: 10 }}
        />
        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Education:</strong> {education.education}</p>
        <p><strong>Skills:</strong> {skills.skills}</p>
        <p><strong>Projects:</strong> {projects.projects}</p>
        <p><strong>Social Links:</strong> {social.social}</p>
      </Card>
      <Button type="primary" onClick={onRestart} style={{ marginTop: 20 }}>
        Restart
      </Button>
    </div>
  );
};

export default CVPreview;
