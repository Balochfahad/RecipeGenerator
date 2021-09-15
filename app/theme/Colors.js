const white = "#FFFFFF";
const black = "#000000";
const grey = "#0000001A";
const darkGrey = "#535353";
const lightGrey = "#e4e4e4";
const red = "#ce0d10";
const transparent = "rgba(0,0,0,0)";

const primary = white;
const secondary = red;
const tertiary = black;
const quaternary = "#F8F8FA";

const background = {
  primary,
  secondary,
  tertiary,
  quaternary
};

const text = {
  primary: darkGrey,
  secondary: black,
  tertiary: white,
  quaternary: grey,
  red
};

const navbar = {
  background: primary,
  text: text.primary
};

const border = lightGrey;
const separator = "#E2E2E4";
const error = red;
const windowTint = "rgba(0, 0, 0, 0.4)";

export default {
  white,
  black,
  grey,
  darkGrey,
  lightGrey,
  transparent,

  primary,
  secondary,
  tertiary,
  quaternary,

  background,
  navbar,
  text,

  border,
  separator,
  windowTint,
  error
};
