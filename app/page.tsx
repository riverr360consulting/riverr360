import HeroSection from '@/components/HeroSection';
import ProblemsSection from '@/components/ProblemsSection';
import FrameworkDiagram from '@/components/FrameworkDiagram';
import LeakageExplained from '@/components/LeakageExplained';
import ReasonsSection from '@/components/ReasonsSection';
import SolutionsSection from '@/components/SolutionsSection';
import WebinarHomeSection from '@/components/WebinarHomeSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <FrameworkDiagram />
      <LeakageExplained />
      <ReasonsSection />
      <SolutionsSection />
      <WebinarHomeSection />
    </>
  );
}
