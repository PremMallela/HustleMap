import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Alert,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { Star } from "@mui/icons-material";

const GitHubData = () => {
  const [githubData, setGithubData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`/api/profile/github`,{
          withCredentials: true,
        });
        setGithubData(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch GitHub data");
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LinearProgress sx={{ mt: 4 }} />;

  if (error) return <Alert severity="error" sx={{ textAlign: "center" }}>{error}</Alert>;

  const { profile, repoNames, topLanguages } = githubData;
  

  return (
    <Box sx={{ bgcolor: "#f0f2f5", minHeight: "100vh", py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
       {/* Profile Card */}
        <Card sx={{ display: "flex", alignItems: "center", p: 3, mb: 4, borderRadius: 4, bgcolor: "#fff" }}>
          <Avatar src={profile.avatar_url} alt={profile.name} sx={{ width: 100, height: 100, mr: 3 }} />
          <Box>
            <Typography variant="h5" fontWeight={600}>{profile.name}</Typography>
            <Typography variant="body1" color="text.secondary">{profile.bio}</Typography>
            <Typography variant="body2" mt={1}>
              <strong>{profile.followers}</strong> Followers • <strong>{profile.following}</strong> Following • <strong>{profile.public_repos}</strong> Public Repos
            </Typography>
          </Box>
        </Card>

        {/* Language Stats */}
        <Card sx={{ p: 3, mb: 4, borderRadius: 4, bgcolor: "#fff" }}>
          <Typography variant="h6" mb={2} fontWeight={600}>Languages Used</Typography>
          <Grid container spacing={2}>
            {Object.entries(topLanguages).map(([lang, count]) => (
              <Grid item key={lang}>
                <Chip label={`${lang} (${count})`} color="primary" variant="outlined" />
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* Repo List */}
        <Typography variant="h6" mb={2} fontWeight={600}>Repositories</Typography>
        <Grid container spacing={3}>
          {repoNames.map((repo) => (
            <Grid item xs={12} md={6} key={repo.name}>
              <Card sx={{ borderRadius: 4, bgcolor: "#ffffff", boxShadow: 3 ,transition: '0.3s', '&:hover': { boxShadow: 10 } }}>
                <CardContent>
                  <Typography variant="h6" component="a" href={repo.html_url} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: "none", color: "#1976d2" }}>
                    {repo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {repo.description || "No description"}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Chip label={repo.language || "N/A"} size="small" color="secondary" />
                    <Tooltip title="Stars">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Star fontSize="small" color="action" />
                        <Typography variant="body2">{repo.stargazers_count}</Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GitHubData;
