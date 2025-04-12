import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Paper,
  Alert,
  Container,
} from "@mui/material";

const LeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/profile/leetcode",
          { withCredentials: true }
        );
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch LeetCode stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LinearProgress sx={{ mt: 4 }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {error ? (
        <Alert severity="error" sx={{ textAlign: "center" }}>
          {error}
        </Alert>
      ) : stats ? (
        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            p: 3,
            transition: "0.3s",
            bgcolor: "#fff",
            "&:hover": {
              boxShadow: 8,
            },
          }}
        >
          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              borderBottom: 1,
              borderColor: "divider",
              pb: 3,
            }}
          >
            <Avatar
              src={stats.profile.userAvatar}
              alt="Avatar"
              sx={{
                width: 80,
                height: 80,
                border: "2px solid #3b82f6",
              }}
            />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {stats.profile.realName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{stats.username}
              </Typography>
              <Typography variant="body2" color="primary">
                {stats.profile.countryName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ranking: #{stats.profile.ranking}
              </Typography>
            </Box>
          </Box>

          {/* Submission Stats */}
          <Grid container spacing={2} mt={3}>
            {stats.submitStats.acSubmissionNum.map((item) => {
              const colors = {
                Easy: { bg: "#d1fae5", text: "#065f46" },
                Medium: { bg: "#fef9c3", text: "#92400e" },
                Hard: { bg: "#fee2e2", text: "#991b1b" },
              };

              const { bg, text } = colors[item.difficulty] || {};

              return (
                <Grid item xs={12} sm={4} key={item.difficulty}>
                  <Paper
                    elevation={0}
                    sx={{
                      textAlign: "center",
                      borderRadius: 3,
                      p: 2,
                      backgroundColor: bg,
                      color: text,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.difficulty}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {item.count}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      ) : (
        <Typography textAlign="center" color="text.secondary">
          No stats available.
        </Typography>
      )}
    </Container>
  );
};

export default LeetCodeStats;
