import type { ReactNode } from 'react';
import useLenis from '../../hooks/useLenis';
import CursorGlow from '../custom/CursorGlow';
import Navigation from '../custom/Navigation';
import SiteFooter from './SiteFooter';

interface SiteShellProps {
  children: ReactNode;
  currentPath: string;
}

const SiteShell = ({ children, currentPath }: SiteShellProps) => {
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-charcoal-950 text-white">
      <CursorGlow />
      <Navigation currentPath={currentPath} />
      <main className="relative">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default SiteShell;
