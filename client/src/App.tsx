import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './app/layout/MainLayout';
import HomePage from './app/features/landing/HomePage';
import DocsPage from './app/features/docs/DocsPage';
import LiveTestPage from './app/features/live-test/LiveTestPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/live-test" element={<LiveTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}