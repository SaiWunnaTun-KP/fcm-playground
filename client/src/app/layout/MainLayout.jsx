import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#1C1917] flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-5 py-4 sm:py-5">
        <Outlet />
      </main>
    </div>
  );
}