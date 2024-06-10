import { extendTheme } from '@chakra-ui/react';

import { Global } from '@emotion/react';

export const Fonts = () => (
    <Global
        styles={`
      @font-face {
        font-family: 'Heading Font Name';
        src: url('/03SmartFontUI.otf') format('otf');
      `}
    />
);

const theme = extendTheme({
    fonts: {
        heading: 'SmartFontUI, sans-serif',
        body: 'SmartFontUI, sans-serif',
    },
});

export default theme;
