import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/animation/pixel-loading-animation.json";

const Loading = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <Lottie className="w-full h-full" animationData={loadingAnimation} loop></Lottie>
    </main>
  );
};

export default Loading;
