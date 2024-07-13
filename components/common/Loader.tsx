import React from "react";
import Image from "next/image";

type SizeType = "screen" | "infiniteLoader";

type Props = {
  size: SizeType;
};

const LoaderComponent = (props: Props) => {
  if (props.size === "screen") {
    return (
      <div className="min-h-screen min-w-screen mix-blend-multiply flex justify-center items-center">
        <Image
          src={"/woodland-loader.gif"}
          height={400}
          width={400}
          alt="Woodland"
        />
      </div>
    );
  }

  if (props.size === "infiniteLoader") {
    return (
      <div className="h-full w-full mix-blend-multiply flex justify-center items-center">
        <Image
          src={"/woodland-loader.gif"}
          height={400}
          width={400}
          alt="Woodland"
        />
      </div>
    );
  }
  return <div>LoaderComponent</div>;
};

export default LoaderComponent;
