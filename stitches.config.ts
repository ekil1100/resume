import {
  sage,
  sageDark,
  mint,
  mintDark,
  teal,
  tealDark,
  green,
  greenDark,
  red,
  redDark,
  yellow,
  yellowDark,
  cyan,
  cyanDark,
  tomato,
  tomatoDark,
  violet,
  violetDark,
} from '@radix-ui/colors'
import { createStitches } from '@stitches/react'

export const { styled, css, createTheme } = createStitches({
  theme: {
    colors: {
      background: sage.sage2,
      text: sage.sage12,
      primary: teal.teal11,
      primaryBorder: teal.teal6,
      primaryBackground: teal.teal2,
      secondary: tomato.tomato9,
      secondaryBorder: tomato.tomato6,
      secondaryBackground: tomato.tomato1,
      accent: violet.violet9,
      link: violet.violet9,
      linkHover: violet.violet11,
    },
    sizes: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
  },
})

export const darkTheme = createTheme({
  colors: {
    ...sageDark,
    ...mintDark,
    ...greenDark,
    ...tealDark,
    ...redDark,
    ...yellowDark,
    ...cyanDark,
    primary: tealDark.teal9,
  },
})
