type scrollCallback = (x: number, y: number) => void;
type resizeCallback = (width: number, height: number) => void;

let width = window.innerWidth;
let height = window.innerHeight;
let scrollYPosition = window.scrollY;
let scrollXPosition = window.scrollX;
let pixelRatio = window.devicePixelRatio;

const onResizeCallbacks: resizeCallback[] = [];
const onScrollCallbacks: scrollCallback[] = [];

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;

  onResizeCallbacks.forEach((callback) => callback(width, height));
});

window.addEventListener("scroll", () => {
  scrollYPosition = window.scrollY;
  scrollXPosition = window.scrollX;

  onScrollCallbacks.forEach((callback) =>
    callback(scrollXPosition, scrollYPosition)
  );
});

export const getPixelRatio = () => pixelRatio;
export const getWidth = () => width;
export const getHeight = () => height;
export const getScrollYPosition = () => scrollYPosition;
export const getScrollXPosition = () => scrollXPosition;

export const onScroll = (callback: scrollCallback) => {
  onScrollCallbacks.push(callback);
};

export const onResize = (callback: resizeCallback) => {
  onResizeCallbacks.push(callback);
};

export const browserManager = {
  getPixelRatio,
  getWidth,
  getHeight,
  getScrollYPosition,
  getScrollXPosition,
  onScroll,
  onResize,
};
