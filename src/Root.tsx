import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { NotePage } from './pages/NotePage/NotePage';
import { Page404 } from './pages/Page404/Page404';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';

export const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/notes/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="note/:postId" element={<NotePage />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};