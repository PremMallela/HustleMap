import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip
} from "@mui/material";
import axios from "../../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { generateHustleReportPDF } from "../../../utils/hustleTimelinePDFgenerator";
import DownloadIcon from "@mui/icons-material/Download";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    hustlePeriod: "",
    lastJob: "",
    resignReason: "",
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile", { withCredentials: true });
      setProfileData(response.data);
    } catch (err) {
      console.error("Error fetching profile data", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profileData.hustlePeriod || !profileData.lastJob || !profileData.resignReason) {
      alert("Please fill all the fields before saving.");
      return;
    }
    setIsSaving(true);
    try {
      await axios.post("/api/profile/save", profileData, { withCredentials: true });
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
      }, 1000);
      fetchProfile();
    } catch (error) {
      console.error("Error saving profile data", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const timelineRes = await axios.get("/api/timeline", { withCredentials: true });
      const timelineEvents = timelineRes.data.events || [];
      generateHustleReportPDF({
        profile: profileData,
        events: timelineEvents,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Could not generate PDF. Try again later.");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Card
        variant="outlined"
        sx={{
          p: 3,
          boxShadow: 3,
          borderColor: "#2f3337",
          borderWidth: 2.5,
          borderStyle: "solid",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Hustler Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {isEditing ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hustle Period"
                  name="hustlePeriod"
                  value={profileData.hustlePeriod}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Attended Job"
                  name="lastJob"
                  value={profileData.lastJob}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason for Resigning"
                  name="resignReason"
                  multiline
                  rows={3}
                  value={profileData.resignReason}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  {isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Hustle Period:</strong> {profileData.hustlePeriod || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Last Attended Job:</strong> {profileData.lastJob || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Reason for Resigning:</strong> {profileData.resignReason || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>What I've Been Doing Since Then:</strong>{" "}
                  <Link
                    to="/hustleTimeline/display"
                    style={{ color: "#1976d2", textDecoration: "underline" }}
                  >
                    View My Hustle Timeline
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" ,mt:2 }}>
                <Button variant="outlined" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center", mt: 1, ml: 20 }}>
                <Tooltip title="Download Gap Timeline PDF">
                  <IconButton onClick={handleDownloadPDF} color="primary">
                    <DownloadIcon />
                    <Typography sx={{ fontSize: "0.8rem", ml: 0.5 }}>
                      Hustle Report
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
