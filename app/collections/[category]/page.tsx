import React, { Suspense } from "react";
import LoaderComponent from "@/components/common/Loader";
import { Metadata } from "next";
import CollectionCategoryPage from "@/components/collection/CollectionWrappedForm";

interface PageProps {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const getProduct = async (
  slug: string,
  gender: string | string[] | undefined,
  brand: string | string[] | undefined
) => {
  const url = `https://capcons.com/go-products/category?category=${slug}&gender=${gender}&circle=woodland${
    brand ? `&brand=${brand}` : ""
  }`;

  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });

    if (!response.ok) {
      return "no data";
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function generateMetadata({
  params: { category },
  searchParams: { gender, brand },
}: PageProps): Promise<Metadata> {
  const product = await getProduct(category, gender, brand);

  if (product === "no data") {
    return {
      title: `Woodland ${category}`,
      description: `Woodland ${category} for ${gender}`,
      openGraph: {
        images: "/default-cat-banner.png",
        title: `${category}`,
        description: `Woodland ${category} for ${gender}`,
      },
    };
  }

  return {
    title: `Woodland ${product.data.title}`,
    description: product.data.description,
    openGraph: {
      images: product.data.image,
      title: product.data.title,
      description: product.data.description,
    },
  };
}

const WrappedCollectionCategoryPage = ({
  params,
}: {
  params: { category: string };
}) => (
  <Suspense fallback={<LoaderComponent size="screen" />}>
    <CollectionCategoryPage para={params.category} />
  </Suspense>
);

export default WrappedCollectionCategoryPage;
