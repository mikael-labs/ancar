import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const Button = defineStyleConfig({
  defaultProps: {
    colorScheme: "primary",
  },
});

const Radio = defineStyleConfig({
  defaultProps: {
    colorScheme: "primary",
  },
});

const TextConfig = defineStyleConfig({
  defaultProps: {
    colorScheme: "primary",
  },
  baseStyle: {
    color: "primary.dark",
  },
});

export const theme = extendTheme({
  colors: {
    primary: {
      100: "#d8d4edff",
      200: "#beb8e0ff",
      300: "#a299d3ff",
      400: "#998fcfff",
      500: "#8f84caff",
      600: "#8278b8ff",
      700: "#766da7ff",
      800: "#6b6398ff",
      900: "#615a8aff",
      dark: "#615a8aff",
      default: "#8f84ca",
      light: "#d8d4edff",
    },
  },
  components: { Button, Radio, Link: TextConfig, Text: TextConfig, Heading: TextConfig },
});
