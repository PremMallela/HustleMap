import { Avatar, Box, Card, CardContent, Grid, Typography, Chip, Alert, LinearProgress, Tooltip } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useFetch } from "../../../utils/hooks/useFetch"

const GitHubData = () => {
  const { data: githubData, error, loading } = useFetch("/api/profile/github");

  if (loading) return <LinearProgress sx={{ mt: 4 }} />; //this helps avoid render stale data
  if (error) return <Alert severity="error" sx={{ textAlign: "center" }}>{error}</Alert>;

  const { profile, repoNames, topLanguages } = githubData;

  return (
    <Box sx={{
      bgcolor: "#f0f2f5",
      minHeight: "100vh",
      borderColor: "#2f3337",
      borderWidth: 2.5,
      borderStyle: "solid",
      borderRadius: 2,
      py: 4,
      px: 2
    }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>

        {/* Profile Card */}
        <Card sx={{ display: "flex", alignItems: "center", p: 3, mb: 4, borderRadius: 4, bgcolor: "primary" }}>
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
        <Card sx={{ p: 3, mb: 4, borderRadius: 4, bgcolor: "background.default" }}>
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
              <Card sx={{
                borderRadius: 4,
                bgcolor: "#ffffff",
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 10 }
              }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    component="a"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: "none" }}
                  >
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
