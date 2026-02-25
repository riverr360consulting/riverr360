import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import LeakageExplained from '@/components/LeakageExplained';
import ReasonsSection from '@/components/ReasonsSection';
import SolutionsSection from '@/components/SolutionsSection';
import WebinarHomeSection from '@/components/WebinarHomeSection';

// Add before footer:
<WebinarHomeSection />

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LeakageExplained />
        <ReasonsSection />
        <SolutionsSection />
        <WebinarHomeSection />
      </main>
      <Footer />
    </>
  );
}
