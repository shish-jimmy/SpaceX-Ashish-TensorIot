import { createTheme } from '@material-ui/core/styles';
import { remToPixels } from './helpers/helpers';

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif', 
    fontSize:remToPixels(0.65)
  },
  palette: {
    background: {
      default: '#ffffff',
    },
  },
});

export default theme;
