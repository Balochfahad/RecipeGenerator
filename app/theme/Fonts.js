import Metrics from "./Metrics";

const type = {
  base: "OpenSans-Light",
  bold: "OpenSans",
  emphasis: "Roboto-Italic"
};

const size = {
  xxxSmall: Metrics.generatedFontSize(8),
  xxSmall: Metrics.generatedFontSize(10),
  xSmall: Metrics.generatedFontSize(12),
  small: Metrics.generatedFontSize(14),
  normal: Metrics.generatedFontSize(16),
  medium: Metrics.generatedFontSize(20),
  large: Metrics.generatedFontSize(22),
  xLarge: Metrics.generatedFontSize(24),
  xxLarge: Metrics.generatedFontSize(30),
  xxxLarge: Metrics.generatedFontSize(40)
};

const style = {
  xxxSmall: {
    fontFamily: type.base,
    fontSize: size.xxxSmall
  },
  xxxSmallBold: {
    fontFamily: type.bold,
    fontSize: size.xxxSmall
  },
  xxxSmallItalic: {
    fontFamily: type.emphasis,
    fontSize: size.xxxSmall
  },
  xxSmall: {
    fontFamily: type.base,
    fontSize: size.xxSmall
  },
  xxSmallBold: {
    fontFamily: type.bold,
    fontSize: size.xxSmall
  },
  xxSmallItalic: {
    fontFamily: type.emphasis,
    fontSize: size.xxSmall
  },
  xSmall: {
    fontFamily: type.base,
    fontSize: size.xSmall
  },
  xSmallBold: {
    fontFamily: type.bold,
    fontSize: size.xSmall
  },
  xSmallItalic: {
    fontFamily: type.emphasis,
    fontSize: size.xSmall
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small
  },
  smallBold: {
    fontFamily: type.bold,
    fontSize: size.small
  },
  smallItalic: {
    fontFamily: type.emphasis,
    fontSize: size.small
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.normal
  },
  bold: {
    fontFamily: type.bold,
    fontSize: size.normal
  },
  italic: {
    fontFamily: type.emphasis,
    fontSize: size.normal
  },
  medium: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  mediumBold: {
    fontFamily: type.bold,
    fontSize: size.medium
  },
  mediumItalic: {
    fontFamily: type.emphasis,
    fontSize: size.medium
  },
  large: {
    fontFamily: type.base,
    fontSize: size.large
  },
  largeBold: {
    fontFamily: type.bold,
    fontSize: size.large
  },
  largeItalic: {
    fontFamily: type.emphasis,
    fontSize: size.large
  },
  xLarge: {
    fontFamily: type.base,
    fontSize: size.xLarge
  },
  xLargeBold: {
    fontFamily: type.bold,
    fontSize: size.xLarge
  },
  xLargeItalic: {
    fontFamily: type.emphasis,
    fontSize: size.xLarge
  },
  xxLarge: {
    fontFamily: type.base,
    fontSize: size.xxLarge
  },
  xxLargeBold: {
    fontFamily: type.bold,
    fontSize: size.xxLarge
  },
  xxLargeItalic: {
    fontFamily: type.emphasis,
    fontSize: size.xxLarge
  },
  xxxLarge: {
    fontFamily: type.base,
    fontSize: size.xxxLarge
  },
  xxxLargeBold: {
    fontFamily: type.bold,
    fontSize: size.xxxLarge
  },
  xxxLargeItalic: {
    fontFamily: type.emphasis,
    fontSize: size.xxxLarge
  }
};

export default {
  type,
  size,
  style
};
