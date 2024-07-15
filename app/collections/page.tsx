import React, { Suspense } from "react";
import LoaderComponent from "@/components/common/Loader";
import CollectionCategoryPage from "@/components/collection/CollectionWrappedForm";

const WrappedCollectionPage = () => (
  <Suspense fallback={<LoaderComponent size="screen" />}>
    <CollectionCategoryPage para={""} />
  </Suspense>
);

export default WrappedCollectionPage;
