import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Card, CardContent, Grid, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    hustlePeriod: "",
    lastJob: "",
    resignReason: "",
    roadmapLink: ""
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true
      });
      setProfileData(response.data);
    } catch (err) {
      console.error("Error saving profile data", error);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!profileData.hustlePeriod || !profileData.lastJob || !profileData.resignReason) {
        alert("Please fill all the fields before saving.");
        return;
      }

      await axios.post("http://localhost:5000/api/profile/save", profileData, {
        withCredentials: true
      });
    
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.log("Error fetching profile data", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
   }
 };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          {!profileData && <p>Fill your Profile Details below</p>}
          <Typography variant="h4" gutterBottom align="center">Hustler Profile</Typography>
          <Divider sx={{ mb: 3 }} />
          {isEditing ? (
            <Grid container columns={12} rowSpacing={2} columnSpacing={2}>
              <Grid span={12}>
                <TextField fullWidth label="Hustle Period" name="hustlePeriod" value={profileData.hustlePeriod} onChange={handleChange} />
              </Grid>
              <Grid span={12}>
                <TextField fullWidth label="Last Attended Job" name="lastJob" value={profileData.lastJob} onChange={handleChange} />
              </Grid>
              <Grid span={12}>
                <TextField fullWidth label="Reason for Resigning" name="resignReason" multiline rows={3} value={profileData.resignReason} onChange={handleChange} />
              </Grid>
              <Grid span={12}>
                <TextField fullWidth label="Roadmap Link" name="roadmapLink" value={profileData.roadmapLink} onChange={handleChange} />
              </Grid>
              <Grid span={12} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container columns={12} rowSpacing={2}>
              <Grid span={12}>
                <Typography><strong>Hustle Period:</strong> {profileData.hustlePeriod || "N/A"}</Typography>
              </Grid>
              <Grid span={12}>
                <Typography><strong>Last Attended Job:</strong> {profileData.lastJob || "N/A"}</Typography>
              </Grid>
              <Grid span={12}>
                <Typography><strong>Reason for Resigning:</strong> {profileData.resignReason || "N/A"}</Typography>
              </Grid>
              <Grid span={12}>
                <Typography>
                  <strong>What I've Been Doing Since Then:</strong>{" "}
                  {profileData.roadmapLink
                    ? <a href={profileData.roadmapLink} target="_blank" rel="noopener noreferrer">View Roadmap</a>
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid span={12} display="flex" justifyContent="center">
                <Button variant="outlined" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
