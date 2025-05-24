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
  Tooltip,
  Alert,
  Link as MuiLink
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "../../../utils/axiosInstance";
import { generateHustleReportPDF } from "../../../utils/generateTimeline";
import { useFetch } from "../../../utils/hooks/useFetch";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    hustlePeriod: "",
    lastJob: "",
    resignReason: "",
  });
  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();
  console.log("hi")
  const { data, loading, error } = useFetch("/api/profile");
   
  useEffect(() => {
    console.log("error",error)
    if(error){
      setIsError(error);
    }
    if (error?.response?.status === 401) {
      navigate("/login");
    } else if (data) {
      setProfileData(data);
    }
  }, [data, error, navigate]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { hustlePeriod, lastJob, resignReason } = profileData;

    if (!hustlePeriod || !lastJob || !resignReason) {
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
    } catch (err) {
      console.error("Error saving profile data", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
      alert("Failed to save profile. Please try again.");
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const { data } = await axios.get("/api/timeline", { withCredentials: true });
      const timelineEvents = data.events || [];
      generateHustleReportPDF({
        profile: profileData,
        events: timelineEvents,
      });
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Could not generate PDF. Try again later.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Alert severity="error">
          {error || "Something went wrong while fetching profile data."}
        </Alert>
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
                <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
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
                  <MuiLink
                    component={RouterLink}
                    to="/hustleTimeline/display"
                    color="primary"
                    sx={{ textDecoration: "underline" }}
                  >
                    View My Hustle Timeline
                  </MuiLink>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                <Button variant="outlined" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center", mt: 1 }}>
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
