import ContentLayout from "@/components/layout/ContentLayout";
import React from "react";

const CollectionLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ContentLayout>{children}</ContentLayout>;
};

export default CollectionLayout;
