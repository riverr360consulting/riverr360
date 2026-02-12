import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import LeakageExplained from '@/components/LeakageExplained';
import ReasonsSection from '@/components/ReasonsSection';
import SolutionsSection from '@/components/SolutionsSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LeakageExplained />
        <ReasonsSection />
        <SolutionsSection />
      </main>
      <Footer />
    </>
  );
}
