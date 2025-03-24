import { Button, Typography, Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        bgcolor: 'linear-gradient(135deg, #1976d2, #42a5f5)',
        color: 'white',
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to MUI Topia
      </Typography>
      <Typography variant="body1" gutterBottom>
        Create beautiful UIs with Material-UI.
      </Typography>
      <Box mt={4} display="flex" gap={2}>
        <Button variant="contained" color="secondary" size="large">
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          href="https://mui.com/material-ui/getting-started/overview/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MUI Docs
        </Button>
      </Box>
    </Box>
  );
}

export default App;
