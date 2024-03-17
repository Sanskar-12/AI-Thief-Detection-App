"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPrediction } from "@/utils/render-predictions";

let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webcam = useRef(null);
  const canvas = useRef(null);

  const runCoco = async () => {
    setIsLoading(true);
    const net = await cocoSSDLoad();
    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  };

  async function runObjectDetection(net) {
    if (
      canvas.current &&
      webcam.current !== null &&
      webcam.current.video?.readyState === 4
    ) {
      canvas.current.width = webcam.current.video.videoWidth;
      canvas.current.height = webcam.current.video.videoHeight;

      //find detected objects
      const detectedObjects = await net.detect(
        webcam.current.video,
        undefined,
        0.6
      );

      const context = canvas.current.getContext("2d");
      renderPrediction(detectedObjects, context);
    }
  }

  const showMyVideo = () => {
    if (webcam.current !== null && webcam.current.video?.readyState === 4) {
      const myVideoWidth = webcam.current.video.videoWidth;
      const myVideoHeight = webcam.current.video.videoHeight;

      webcam.current.video.width = myVideoWidth;
      webcam.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    runCoco();
    showMyVideo();
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-title">Loading Ai Model</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md ">
          {/* webcam */}
          <Webcam
            ref={webcam}
            className="rounded-md w-full lg:h-[720px]"
            muted
          />
          {/* canvas */}
          <canvas
            ref={canvas}
            className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
