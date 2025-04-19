import { useAuth } from '../contexts/AuthContext';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid,
  Stack,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  CalendarToday,
  MedicalServices,
  People,
  ExitToApp,
  PersonAdd,
  ListAlt
} from '@mui/icons-material';

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Box component="main" sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      {/* Header Section */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
          {user.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h4" component="h1">
            Welcome, {user.name}
          </Typography>
          <Chip 
            label={user.role.toUpperCase()} 
            color="primary" 
            size="small" 
            sx={{ mt: 1 }}
          />
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Main Dashboard Grid - Updated Syntax */}
      <Grid container spacing={3}>
        {/* Patient Dashboard */}
        {user.role === 'patient' && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday color="primary" /> Book Appointment
                  </Typography>
                  <Button
                    component={Link}
                    to="/appointments/new"
                    variant="contained"
                    size="large"
                    startIcon={<PersonAdd />}
                    fullWidth
                  >
                    New Appointment
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ListAlt color="primary" /> My Appointments
                  </Typography>
                  <Button
                    component={Link}
                    to="/appointments"
                    variant="outlined"
                    size="large"
                    startIcon={<MedicalServices />}
                    fullWidth
                  >
                    View All Appointments
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </>
        )}

        {/* Doctor Dashboard */}
        {user.role === 'doctor' && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MedicalServices color="primary" /> Today's Schedule
                  </Typography>
                  <Button
                    component={Link}
                    to="/doctor/schedule"
                    variant="contained"
                    size="large"
                    startIcon={<CalendarToday />}
                    fullWidth
                  >
                    View Schedule
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People color="primary" /> My Patients
                  </Typography>
                  <Button
                    component={Link}
                    to="/doctor/patients"
                    variant="outlined"
                    size="large"
                    startIcon={<People />}
                    fullWidth
                  >
                    Patient List
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </>
        )}

        {/* Nurse Dashboard */}
        {user.role === 'nurse' && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonAdd color="primary" /> Patient Assistance
                  </Typography>
                  <Button
                    component={Link}
                    to="/nurse/patients"
                    variant="contained"
                    size="large"
                    startIcon={<People />}
                    fullWidth
                  >
                    Assist Patients
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday color="primary" /> Appointment Queue
                  </Typography>
                  <Button
                    component={Link}
                    to="/nurse/queue"
                    variant="outlined"
                    size="large"
                    startIcon={<ListAlt />}
                    fullWidth
                  >
                    View Queue
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>

      {/* Footer Section */}
      <Box component="footer" sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={logout}
          variant="outlined"
          color="error"
          startIcon={<ExitToApp />}
          size="large"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}