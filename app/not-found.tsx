import ContentLayout from "@/components/layout/ContentLayout";
import React from "react";

function NotFound() {
  return (
    <ContentLayout>
      <div className="flex items-center justify-center my-10 h-1/2">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-900">Ooops!</p>
          <div>
            <img className="w-full" src="/error.png" alt="Error" />
          </div>
          <p className="text-2xl font-bold text-green-900">Error</p>
          <p className="text-xl font-semibold text-green-900">
            The page you were looking for does not exist.
          </p>
        </div>
      </div>
    </ContentLayout>
  );
}

export default NotFound;
