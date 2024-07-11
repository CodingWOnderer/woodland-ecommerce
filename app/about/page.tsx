import AboutSection from "@/components/common/AboutSection";
import FramerTransition from "@/components/common/FramerTransition";
import ContentLayout from "@/components/layout/ContentLayout";
import React from "react";

const AboutUsPAge = () => {
  return (
  <FramerTransition>
     <ContentLayout>
      <div className="md:m-8 md:mt-0 overflow-hidden md:rounded-2xl border">
        <AboutSection />
      </div>

      <div className=" bg-primary md:rounded-2xl md:m-8">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technology & Innovation
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground">
              {` The increasing diversity of outdoor activity requires creative
              solutions that meet the quest for adventure. That's where
              Woodland's expertise comes into picture. It combines activity
              focused designs and technologically advanced materials available,
              created in the most innovative and effective manner possible.`}
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  </FramerTransition>
  );
};

export default AboutUsPAge;
