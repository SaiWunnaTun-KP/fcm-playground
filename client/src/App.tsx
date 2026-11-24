import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './app/layout/MainLayout';
import HomePage from './app/features/landing';
import DocsPage from './app/features/docs';
import LiveTestPage from './app/features/live-test';

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