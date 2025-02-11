import React from 'react';
import { ThemeProvider, createGlobalStyle, resetCSS } from '@nx-kit/styling';
import { theme } from '@nx-kit/theme-default';
import { OverlayProvider } from '@nx-kit/overlay';
import { BreakpointProvider } from '@nx-kit/breakpoint';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const GlobalStyle = createGlobalStyle`
  ${resetCSS}
  ${({ theme }) => theme?.global?.styles};
`;

export const decorators = [
  (Story: any) => (
    <ThemeProvider theme={theme}>
      <BreakpointProvider>
        <GlobalStyle />
        <OverlayProvider>
          <Story />
        </OverlayProvider>
      </BreakpointProvider>
    </ThemeProvider>
  ),
];
