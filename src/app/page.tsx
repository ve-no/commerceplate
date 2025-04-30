export const dynamic = "force-dynamic";

import CollectionsSlider from "@/components/CollectionsSlider";
import HeroSlider from "@/components/HeroSlider";
import SkeletonCategory from "@/components/loadings/skeleton/SkeletonCategory";
import SkeletonFeaturedProducts from "@/components/loadings/skeleton/SkeletonFeaturedProducts";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getCollectionProducts, getCollections } from "@/lib/shopify";
import CallToAction from "@/partials/CallToAction";
import FeaturedProducts from "@/partials/FeaturedProducts";
import SeoMeta from "@/partials/SeoMeta";
import { Suspense } from "react";

const { collections } = config.shopify;

const ShowHeroSlider = async () => {
  const sliderImages = await getCollectionProducts({
    collection: collections.hero_slider,
  });
  const { products } = sliderImages;
  return <HeroSlider products={products} />;
};

const ShowCollections = async () => {
  const collections = await getCollections();
  return <CollectionsSlider collections={collections} />;
};

const ShowFeaturedProducts = async () => {
  const { pageInfo, products } = await getCollectionProducts({
    collection: collections.featured_products,
    reverse: false,
  });
  return <FeaturedProducts products={products} />;
};

const Home = () => {
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      <SeoMeta />
      <section>
        <div className="container">
          <div className="bg-gradient py-10 rounded-md">
            <Suspense>
              <ShowHeroSlider />
            </Suspense>
          </div>
        </div>
      </section>

      {/* category section  */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2>Collections</h2>
          </div>
          <Suspense fallback={<SkeletonCategory />}>
            <ShowCollections />
          </Suspense>
        </div>
      </section>

      {/* Featured Products section  */}
      <section>
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="mb-2">Featured Products</h2>
            <p className="md:h5">Explore Today's Featured Picks!</p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowFeaturedProducts />
          </Suspense>
        </div>
      </section>

      <CallToAction data={callToAction} />



      <section className="section bg-muted py-12">
  <div className="container text-center">
    <h2 className="text-3xl font-bold mb-8">Our Promise to You 🌸</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Love It or Return It 💖</h3>
        <p className="text-muted-foreground">
          We stand by every bouquet. If you’re not completely in love within 30 days, we’ll make it right—no questions, no hassle.
        </p>
      </div>
      <div className="p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Stress-Free Returns 🔄</h3>
        <p className="text-muted-foreground">
          Changed your mind? No worries. Reach out within 14 days, and our team will walk you through a quick and easy return process.
        </p>
      </div>
      <div className="p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Speedy, Secure Delivery 🚚</h3>
        <p className="text-muted-foreground">
          Get your flowers fresh and fast. Every order ships with tracking and care, so your blooms arrive perfect and on time.
        </p>
      </div>
    </div>
  </div>
</section>



    </>
  );
};

export default Home;
