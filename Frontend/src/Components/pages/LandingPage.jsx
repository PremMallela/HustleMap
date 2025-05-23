import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  IconButton, 
  Stack, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { 
  ArrowForward, 
  Timeline, 
  TrendingUp, 
  People, 
  Twitter, 
  GitHub, 
  LinkedIn 
} from '@mui/icons-material';
import Logo from '../../../src/assets/hm-logo.avif'; 

const colors = {
  primary: '#4caf50', 
  primaryLight: '#80e27e',
  primaryDark: '#129990',
  secondary: '#26a69a', 
  background: '#f0f0f0',
  text: 'text-gray-900',
  lightText: 'text-gray-700',
  darkBackground: '#1b5e20',
};

const LandingPage =()=> {
  return (
    <Box className="min-h-screen">
      {/* Header/Navbar */}
      <Box>
       <Toolbar className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <img src={Logo} alt="HustleMap" style={{height: '4rem', objectFit: 'contain' }} />
        <Typography
            variant="h5"
            component="div"
            sx={{
                fontWeight: 'bold',
                display: 'inline-block',
                background: `linear-gradient(90deg, ${colors.secondary}, #fff, ${colors.secondary})`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '1px #258D52',
                animation: 'shine 2.5s linear infinite',
                letterSpacing: 0.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            }}
            >
            HustleMap
        </Typography>


          <Stack direction="row" className="ml-auto space-x-4 sm:space-x-8 items-center">
            <Button component={Link} to="/login" variant="text" className={colors.lightText}>
              Login
            </Button>
            <Button 
              component={Link} 
              to="/signup" 
              variant="contained" 
              className={`bg-${colors.primary} hover:bg-${colors.primaryDark} text-white`}
              sx={{ backgroundColor: colors.primary, '&:hover': { backgroundColor: colors.primaryDark } }}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </Box>

      {/* Hero Section */}
      <Box
          className={`pt-16 pb-40`}
          sx={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh', 
          }}
      >

        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                className="font-extrabold text-white mb-4"
              >
                Showcase Your <span style={{ color: colors.primary }}>Career Journey</span>
              </Typography>
              <Typography 
                variant="subtitle1" 
                className="mb-8"
                sx={{ color: 'white' }}
              >
                HustleMap helps you visualize your career gaps and achievements in a powerful timeline, 
                making interviews more effective and your journey more compelling.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} mt={6}>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  className="py-2.5 px-5 text-white"
                  sx={{ backgroundColor: colors.primary, '&:hover': { backgroundColor: colors.primaryDark } }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  className="border-gray-300 text-gray-700"
                  sx={{ borderColor: colors.primary, color: colors.primary, '&:hover': { borderColor: colors.primaryDark, color: colors.primaryDark } }}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
            </Grid>
          </Grid>
        </Container>
      </Box>

      
      <Box className="py-16">
        <Container maxWidth="lg">
          <Box className="text-center mb-12">
            <Typography 
              variant="h3" 
              component="h2" 
              className="font-extrabold text-gray-900 mb-4"
              sx={{ mb: 4 }}
            >
              Why HustleMap?
            </Typography>
            <Typography 
              variant="h6" 
              className="text-gray-700 max-w-2xl mx-auto"
            >
              Stand out in interviews by presenting your career journey visually
            </Typography>
          </Box>

          <Grid container justifyContent="center" alignItems="center"spacing={4}>
            {/* Feature 1 */}
            <Grid item xs={12} md={4}>
              <Card className="h-full bg-white border-0 shadow-sm hover:shadow transition-shadow duration-300">
                <CardContent className="text-center p-6">
                  <Box className="w-16 h-16 mx-auto rounded-md flex items-center justify-center mb-4" 
                       sx={{ backgroundColor: colors.primary, color: 'white' }}>
                    <Timeline fontSize="large" />
                  </Box>
                  <Typography variant="h5" component="h3" className="font-medium text-gray-900 mb-2">
                    Visual Timeline
                  </Typography>
                  <Typography className="text-gray-600">
                    Convert your career journey into an engaging visual timeline that highlights your progression.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Feature 2 */}
            <Grid item xs={12} md={4}>
              <Card className="h-full bg-white border-0 shadow-sm hover:shadow transition-shadow duration-300">
                <CardContent className="text-center p-6">
                  <Box className="w-16 h-16 mx-auto rounded-md flex items-center justify-center mb-4"
                       sx={{ backgroundColor: colors.secondary, color: 'white' }}>
                    <TrendingUp fontSize="large" />
                  </Box>
                  <Typography variant="h5" component="h3" className="font-medium text-gray-900 mb-2">
                    Explain Career Gaps
                  </Typography>
                  <Typography className="text-gray-600">
                    Turn career gaps into growth opportunities by showcasing what you learned during those periods.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Feature 3 */}
            <Grid item xs={12} md={4}>
              <Card className="h-full bg-white border-0 shadow-sm hover:shadow transition-shadow duration-300">
                <CardContent className="text-center p-6">
                  <Box className="w-16 h-16 mx-auto rounded-md flex items-center justify-center mb-4"
                       sx={{ backgroundColor: colors.primaryLight, color: 'white' }}>
                    <People fontSize="large" />
                  </Box>
                  <Typography variant="h5" component="h3" className="font-medium text-gray-900 mb-2">
                    Impress Recruiters
                  </Typography>
                  <Typography className="text-gray-600">
                    Stand out from other candidates with a unique, visually compelling representation of your career.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to action */}
      <Box className="py-12 lg:py-16"
           sx={{ backgroundColor: colors.primary, color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="center" spacing={4}>
            <Grid item xs={12}>
              <Typography 
                variant="h3" 
                component="h2" 
                className="text-white font-extrabold tracking-tight mb-2"
              >
                Ready to level up your job interviews?
              </Typography>
              <Typography 
                variant="h5" 
                className="text-white/80"
              >
                Create your HustleMap today.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} className="mt-8 md:mt-0 text-center md:text-right">
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                className="bg-white px-5 py-3"
                sx={{ backgroundColor: 'white', color: colors.primary, '&:hover': { backgroundColor: '#f0f0f0' } }}
              >
                Get started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="py-12 bg-white/80">
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={6} className="order-2 md:order-1 mt-8 md:mt-0">
              <Typography className="text-center md:text-left text-gray-500 text-sm">
                &copy; 2025 HustleMap, Inc. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="order-1 md:order-2">
              <Stack direction="row" spacing={3} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <IconButton aria-label="Twitter" className="text-gray-400 hover:text-gray-600">
                  <Twitter />
                </IconButton>
                <IconButton aria-label="GitHub" className="text-gray-400 hover:text-gray-600">
                  <GitHub />
                </IconButton>
                <IconButton aria-label="LinkedIn" className="text-gray-400 hover:text-gray-600">
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;