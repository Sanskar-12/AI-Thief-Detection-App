import { throttle } from "lodash";

export const renderPrediction = (detectedObjects, context) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  //Fonts
  const font = "16px sans-serif";
  context.font = font;
  context.textBaseLine = "top";

  detectedObjects.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    const isPerson = prediction.class === "person";

    //bounding box
    context.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
    context.lineWidth = 3;
    context.strokeRect(x, y, width, height);

    // fill the color
    context.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`; // Set the fill color to red
    context.fillRect(x, y, width, height);

    // Draw the label background.
    context.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    const textWidth = context.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    context.fillRect(x, y, textWidth + 3, textHeight + 3);

    context.fillStyle = "#000000";
    context.fillText(prediction.class, x, y);

    if (isPerson) {
      playAudio();
    }
  });
};

const playAudio = throttle(() => {
  const audio = new Audio("/pols-aagyi-pols.mp3");
  audio.play();
}, 2000);
