import { extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react';

export const Fonts = () => (
    <Global
        styles={
            /* css */ `
      @font-face {
        font-family: '03SmartFontUI';
        src: url('/03SmartFontUI.otf') format('otf');
        
      }
      `
        }
    />
);

export const theme = extendTheme({
    fonts: {
        heading: `'03SmartFontUI', sans-serif`,
        body: `'03SmartFontUI', sans-serif`,
    },
});
