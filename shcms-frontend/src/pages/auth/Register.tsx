import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Alert, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'nurse';
  specialization?: string;
};

export default function Register() {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create Account
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                role: e.target.value as 'patient' | 'doctor' | 'nurse' 
              }))}
              required
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="nurse">Nurse</MenuItem>
            </Select>
          </FormControl>
          {formData.role === 'doctor' && (
            <TextField
              label="Specialization"
              name="specialization"
              fullWidth
              margin="normal"
              value={formData.specialization || ''}
              onChange={handleChange}
              required
            />
          )}
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </form>
        <Typography align="center">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
