import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import MainPage from './pages/MainPage';
import QuestionListPage from './pages/QuestionListPage';
import AnswerPage from './pages/AnswerPage';
import QuestionFeedPage from './pages/QuestionFeedPage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';
import ThemeButton from './components/Buttons/ThemeButton';
import AudioButton from './components/Buttons/AudioButton';

function App() {
  const [mode, setMode] = useState('light');
  const handleMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme[mode]}>
        <ThemeButton type="button" onClick={handleMode} />
        <AudioButton />
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/list" element={<QuestionListPage />} />
            <Route path="/post">
              <Route path=":id/answer" element={<AnswerPage />} />
              <Route path=":id" element={<QuestionFeedPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
