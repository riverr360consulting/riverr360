import HeroSection from '@/components/HeroSection';
import ProblemsSection from '@/components/ProblemsSection';
import FrameworkDiagram from '@/components/FrameworkDiagram';
import SolutionsSection from '@/components/SolutionsSection';
import CaseStudyStrip from '@/components/CaseStudyStrip';
import WebinarHomeSection from '@/components/WebinarHomeSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <FrameworkDiagram />
      <SolutionsSection />
      <CaseStudyStrip />
      <WebinarHomeSection />
    </>
  );
}
