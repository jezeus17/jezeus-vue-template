import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{sky.50}",
      100: "{sky.100}",
      200: "{sky.200}",
      300: "{sky.300}",
      400: "{sky.400}",
      500: "{sky.500}",
      600: "{sky.600}",
      700: "{sky.700}",
      800: "{sky.800}",
      900: "{sky.900}",
      950: "{sky.950}",
    },
    focusRing: {
      width: "2px",
      color: "{primary.color}",
      offset: "1px",
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
      dark: {
        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
    },


  },
  components: {

    menubar: {
      border: {
        color: "transparent",
        radius: '0px'
      }

    },
    dialog: {
      footer: {
        gap: "4rem"

      }
    }
  },
});
