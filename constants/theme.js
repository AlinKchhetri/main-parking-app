import { useTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { useSelector } from "react-redux";

export const Theme = () => {
    // const {colors} = useTheme();
    console.log("🚀 ~ file: theme.js:8 ~ Theme ~ colors")
}

export const COLORS = {

    // base colors
    primary: "#24C16B", // green
    secondary: "#0C381F",   // dark green

    green: "#005fd4ff",
    // green: "#66D59A",
    lightGreen: "#E6FEF0",

    blue: "#1987ff",

    lime: "#00BA63",
    emerald: "#2BC978",

    red: "#ED4756",
    lightRed: "#FFF1F0",

    purple: "#6B3CE9",
    lightpurple: "#F3EFFF",

    yellow: "#FFC664",
    lightyellow: "#FFF9EC",

    black: "#000000",
    white: "#FFFFFF",

    lightGray: "#FCFBFC",
    gray: "#f0f1f2",
    darkgray: "#C3C6C7",
    grey: '#707C80',

    transparent: "transparent",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 15,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    h5: 15,
    h6: 12,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "SF-Pro-Regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "SF-Pro-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "SF-Pro-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "SF-Pro-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "SF-Pro-Bold", fontSize: SIZES.h4, lineHeight: 20 },
    h5: { fontFamily: "SF-Pro-Bold", fontSize: SIZES.h5, lineHeight: 18 },
    h6: { fontFamily: "SF-Pro-Bold", fontSize: SIZES.h6, lineHeight: 18 },
    body1: { fontFamily: "SF-Pro-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "SF-Pro-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "SF-Pro-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "SF-Pro-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "SF-Pro-Regular", fontSize: SIZES.body5, lineHeight: 22 },
    body6: { fontFamily: "SF-Pro-Regular", fontSize: SIZES.body6, lineHeight: 18 },
};

export const darkFONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55, color: COLORS.white },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36, color: COLORS.white },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30, color: COLORS.white },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22, color: COLORS.white },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22, color: COLORS.white },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36, color: COLORS.white },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30, color: COLORS.white },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22, color: COLORS.white },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22, color: COLORS.white },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22, color: COLORS.white },
};

const appTheme = { Theme, COLORS, SIZES, FONTS, darkFONTS };

export default appTheme;