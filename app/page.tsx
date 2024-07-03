import HeroSection from "@/components/common/HeroSection";
import ProductCard from "@/components/home/productCard";
import ContentLayout from "@/components/layout/ContentLayout";

interface CategoryCard {
  img: string;
  title: string;
  link: string;
}

const categoryCard: CategoryCard[] = [
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/may2024/h_cat_1.webp",
    title: "Bestsellers",
    link: "/collections?bestSeller=true",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/may2024/h_cat_2.webp",
    title: "Sneakers",
    link: "/collections/sneakers?gender=MEN",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/may2024/h_cat_3.webp",
    title: "Boots",
    link: "/collections/boots?gender=MEN",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/may2024/h_cat_4.webp",
    title: "Sandals",
    link: "/collections/casual_sandals?gender=MEN",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/may2024/h_cat_5.webp",
    title: "Men’s Apparel",
    link: "/collections/polo?gender=MEN",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/may2024/h_cat_6.webp",
    title: "Women’s Apparel",
    link: "/collections/polo?gender=WOMEN",
  },
];

export default function Home() {
  return (
    <ContentLayout>
      <HeroSection />
      <div className="container py-10 sm:grid-cols-2 grid lg:grid-cols-3 gap-6">
        {categoryCard.map((item, index) => (
          <ProductCard
            key={index}
            src={item.img}
            href={item.link}
            title={item.title}
          />
        ))}
      </div>
    </ContentLayout>
  );
}
