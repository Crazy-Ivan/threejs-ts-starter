import Detector from "utils/detector";
import { run } from "./main";
import "./index.css";

const rootContainer = document.getElementById("root");

if (!Detector.webgl) {
  Detector.addGetWebGLMessage({ parent: rootContainer });
} else {
  const container = document.getElementById("root");

  if (container) {
    run(container);
  }
}
export {};
