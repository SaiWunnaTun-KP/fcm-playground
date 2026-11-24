import { Link, NavLink } from 'react-router-dom';
import { BellRing, BookOpen, Zap } from 'lucide-react';

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 transition-colors flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
      isActive
        ? 'bg-[#EAB32E] border-[#1C1917] text-[#1C1917]'
        : 'border-transparent text-[#1C1917] hover:border-[#1C1917] hover:bg-[#F5EFE6]'
    }`;

  return (
    <header className="w-full max-w-7xl mx-auto pt-3 px-3 sm:px-5">
      <nav className="comic-panel bg-[#FCF9F4] px-3.5 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F26D21] border-2 border-[#1C1917] flex items-center justify-center text-[#FCF9F4] group-hover:rotate-6 transition-transform">
            <BellRing className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="leading-none">
            <span className="font-display text-sm sm:text-lg tracking-tight block">
              FCM PLAYGROUND
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#1C1917]/70">
              WEB + ADMIN SDK LAB
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[#1C1917]/10 pt-2 sm:pt-0">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/docs" className={navLinkClass}>
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Setup Docs</span>
          </NavLink>
          <NavLink to="/live-test" className={navLinkClass}>
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Live Test</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}