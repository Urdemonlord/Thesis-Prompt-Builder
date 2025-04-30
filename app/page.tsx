import { MainLayout } from "@/components/layouts/main-layout";
import { WelcomeHero } from "@/components/welcome-hero";
import { CategoryFeatures } from "@/components/category-features";

export default function Home() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <WelcomeHero />
        <CategoryFeatures />
      </div>
    </MainLayout>
  );
}