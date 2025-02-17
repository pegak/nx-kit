# @nx-kit/styling

The @nx-kit/styling package contains the design system and a few utility functions.
It is based on **styled-components** and reexports all of its functions.

**babel-plugin-styled-components** is also already included.

## Installation

`npm install @nx-kit/styling`

`yarn add @nx-kit/styling`

## Theme

The design system values and component skin styles are all inside the theme.
You are free to choose the keys and values, but for the design system to work, the theme must have a certain format.

**Example theme:**

```javascript
const theme = {
  global: {
    styles: css`
      body {
        font-size: ${({ theme }) => theme?.global?.fontSize?.['16']};
        line-height: ${({ theme }) => theme?.global?.lineHeight?.default};
        ${({ theme }) => theme?.global?.font?.trebuchetNormal};
        color: ${({ theme }) => theme?.global?.color?.gray500};
      }
    `,
    color: {
      black: '#000',
      gray500: '#ccc',
    },
    breakpoint: {
      xs: { min: 0, max: 575.98 },
      sm: { min: 576, max: 767.98 },
      md: { min: 768, max: 991.98 },
      lg: { min: 992, max: 1199.98 },
      xl: { min: 1200, max: null },
    },
    spacing: {
      5: '5px',
      10: '10px',
      20: '20px',
      40: '40px',
    },
    font: {
      trebuchetNormal: `
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
        font-weight: normal;
      `,
    },
    fontSize: {
      14: '14px',
      16: '16px',
      18: '18px',
    },
    lineHeight: {
      default: 1.5,
    },
    zIndex: {
      1: 1,
      10: 10,
      50: 50,
      100: 100,
    },
    // ... more global values
  },
  component: {
    button: {
      global: css`
        position: relative;
        display: inline-flex;
      `,
      skin: {
        primary: css`
          color: ${({ theme }) => theme.global.color.black};
        `
      },
    },
    // ... more components
  },
};

```

As you see the theme consists of global and component values/styles.
You can use the global values in the styled components but they are also used for the design system.

## Design System

Most of the nx-kit components have a special `styles` prop.
With this prop you are able to set some styles directly on the component.
These are not inline styles like the `style` prop and you can also use the global values from the theme.

**Example:**

```javascript
<Button
  onPress={(e: any) => console.log(e)}
  skin="primary"
  styles={{ padding: 40, marginTop: { xs: 20, md: 40 } }}
>
  Press me
</Button>
```

As you can see, you are also able to use the breakpoints, but only "up" media queries.
Because the keys for spacing (20, 40) exists in the theme, the corresponding values are used. Else it would use the value directly for the css.

For consistency it is recommend to also use the global values in the styled components where possible.

**Example styled:**

```javascript
import { styled } from '@nx-kit/styling';

const Example = styled.div`
  ${({ theme }) => `
    color: ${theme?.global?.color?.gray500};
    ${theme?.global?.font?.trebuchetNormal};
  `};
`;
```

In the `styles` prop only a subset of css is possible because it should be only used for small tweaks.
The following table shows what is possible and which global values are used.

styles prop | global theme prop
------------ | -------------
marginTop, marginBottom, marginLeft, marginRight, margin, marginX, marginY, paddingTop, paddingBottom, paddingLeft, paddingRight, padding, paddingX, paddingY, gap | spacing
zIndex | zIndex
color, backgroundColor | color
font | font
fontSize | fontSize
lineHeight | lineHeight
flexGrow, flexShrink, flexBasis, flex, alignSelf, order | -
position, top, right, bottom, left | -
opacity | -
width, height, minWidth, maxWidth, minHeight, maxHeight, display, verticalAlign, overflow, overflowX, overflowY | -
letterSpacing, textAlign, fontStyle, textTransform, textDecoration, textOverflow | -

## media Helper

@nx-kit/styling exports a `media` function that can be used for media queries.
You can use the breakpoint keys from the theme.
First parameter is min (uses the min value from the breakpoint), second optional is max (uses the max value from the breakpoint).

```javascript
import { styled, media } from '@nx-kit/styling';

const Example = styled.div`
  margin-top: 10px;

  ${media('md')} {
    margin-top: 20px;
  }

  ${media('lg', 'xl')} {
    color: red;
  }
`;
```

## Sorted breakpoints

If you need the breakpoints sorted you can use the `useBreakpointsSorted` hook.
It is a low level functionality and is used by @nx-kit/breakpoint.

```javascript
import { useBreakpointsSorted } from '@nx-kit/styling';

const Example = () => {
  const sortedBreakpoints = useBreakpointsSorted();

  // returns array like { min: number; max: number | null; breakpoint: string | number }[]
};
```

## reset CSS

@nx-kit/styling also exports a lightweight reset CSS string:

```javascript
import { resetCSS } from '@nx-kit/styling';
```
