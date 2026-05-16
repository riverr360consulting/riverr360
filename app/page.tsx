import HeroSection from '@/components/HeroSection';
import LeakageImpact from '@/components/LeakageImpact';
import LeakageExplained from '@/components/LeakageExplained';
import ReasonsSection from '@/components/ReasonsSection';
import SolutionsSection from '@/components/SolutionsSection';
import WebinarHomeSection from '@/components/WebinarHomeSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LeakageExplained />
      <ReasonsSection />
      <SolutionsSection />
      <WebinarHomeSection />
    </>
  );
}
