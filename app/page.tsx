import HeroSection from '@/components/HeroSection';
import ProblemsSection from '@/components/ProblemsSection';
import LeakageExplained from '@/components/LeakageExplained';
import ReasonsSection from '@/components/ReasonsSection';
import SolutionsSection from '@/components/SolutionsSection';
import WebinarHomeSection from '@/components/WebinarHomeSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <LeakageExplained />
      <ReasonsSection />
      <SolutionsSection />
      <WebinarHomeSection />
    </>
  );
}
