import SiteShell from '../components/layout/SiteShell';
import Hero from '../sections/Hero';
import HomeOverview from '../sections/HomeOverview';
import { routes } from '../data/siteContent';

const HomePage = () => {
  return (
    <SiteShell currentPath={routes.home}>
      <Hero />
      <HomeOverview />
    </SiteShell>
  );
};

export default HomePage;
