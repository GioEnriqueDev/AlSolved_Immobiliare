import SiteShell from '../components/layout/SiteShell';
import Hero from '../sections/Hero';
import HomeOverview from '../sections/HomeOverview';
import TransformationPortfolio from '../sections/TransformationPortfolio';
import { routes } from '../data/siteContent';

const HomePage = () => {
  return (
    <SiteShell currentPath={routes.home}>
      <Hero />
      <HomeOverview />
      <TransformationPortfolio />
    </SiteShell>
  );
};

export default HomePage;
