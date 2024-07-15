import FramerTransition from "@/components/common/FramerTransition";
import ContentLayout from "@/components/layout/ContentLayout";
import React from "react";

const CollectionLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <FramerTransition>
      <ContentLayout>{children}</ContentLayout>
    </FramerTransition>
  );
};

export default CollectionLayout;
