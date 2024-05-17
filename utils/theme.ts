import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffb74d',
      light: '#ffa726',
      dark: '#f57c00'
    },
  },
});

export const MainButton = styled(Button)({
  fontSize: 18,
  fontWeight: '700',
  maxWidth: '200px',
  minWidth: "10px",
  borderRadius: '5px',
  backgroundColor: '#e6c638',
  border: '1px solid #e6c638',
  color: '#fff',
  transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0px 3px 13px 0px #c5c5c5',
    backgroundColor: '#fff',
    color: '#e6c638',
    border: '1px solid #fff',
  }
});

export const InputButton = styled(Button) ({
  maxWidth: '50px',
  minWidth: "10px",
})
