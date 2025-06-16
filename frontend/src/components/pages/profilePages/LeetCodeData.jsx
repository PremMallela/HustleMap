import React, { useEffect, useState } from "react";
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
import { useFetch } from "../../../utils/hooks/useFetch";

const LeetCodeStats = () => {
  
  const {data: stats ,loading, error} = useFetch("/api/profile/leetcode");

  if (loading) return <LinearProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ textAlign: "center" }}>{error}</Alert>;

  const { profile, username, submitStats } = stats;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {stats ? (
        <Card
          variant="outlined"
          sx={{
            borderColor: "#2f3337",    
            borderWidth: 2.5,
            borderStyle: "solid",
            borderRadius: 4,
            transition: "0.3s",
            bgcolor: "#fff",
            "&:hover": {
              boxShadow: 8,
            }
          }}
        >
          <CardContent>
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
                src={profile.userAvatar}
                alt="Avatar"
                sx={{
                  width: 80,
                  height: 80,
                  border: "2px solid #3b82f6",
                }}
              />
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {profile.realName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{username}
                </Typography>
                <Typography variant="body2" color="primary">
                  {profile.countryName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ranking: #{profile.ranking}
                </Typography>
              </Box>
            </Box>

            {/* Submission Stats */}
            <Grid container spacing={2} mt={3}>
              {submitStats.acSubmissionNum.map((item) => {
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
          </CardContent>
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
