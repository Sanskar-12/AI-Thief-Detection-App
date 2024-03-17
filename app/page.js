import ObjectDetection from "@/components/object-detection";
import React from "react";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center gradient-title ">
        Thief Detection Alarm
      </h1>
      <ObjectDetection />
    </main>
  );
};

export default Home;
