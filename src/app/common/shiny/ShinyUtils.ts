export const onMouseOver = (shiny: any, color: string, opacity: number) => () => {
  shiny.style.setProperty("--from-color", color);
  shiny.style.setProperty("--to-color", color);
  shiny.style.setProperty("--shine-opacity", opacity.toString());
};

export const onMouseMove = (shiny: any) => (e: any) => {
  const {x, y} = calculateCoordinates(shiny, e);

  shiny.style.setProperty("--x", x.toString());
  shiny.style.setProperty("--y", y.toString());
};

export const onMouseOut = (shiny: any) => () => {
  shiny.style.setProperty("--from-color", "transparent");
  shiny.style.setProperty("--to-color", "transparent");
};

export const setShineSizeAndOffset = (shiny: any, size: number) => {
  shiny.style.setProperty("--shine-size", `${size}px`);
  shiny.style.setProperty("--shine-offset", `${size / 2}px`);
};

export const calculateCoordinates = (shiny: any, e: any) => {
  const {left: boundX, top: boundY} = shiny.getBoundingClientRect();
  const {clientX, clientY} = e;

  const x = clientX - boundX;
  const y = clientY - boundY;

  return {x, y};
};
