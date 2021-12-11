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
      backgroundHover: sage.sage4,
      backgroundActive: sage.sage5,
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
    background: sageDark.sage2,
    backgroundHover: sageDark.sage4,
    backgroundActive: sageDark.sage5,
    text: sageDark.sage12,
    primary: tealDark.teal11,
    primaryBorder: tealDark.teal6,
    primaryBackground: tealDark.teal2,
    secondary: tomatoDark.tomato9,
    secondaryBorder: tomatoDark.tomato6,
    secondaryBackground: tomatoDark.tomato1,
    accent: violetDark.violet9,
    link: violetDark.violet9,
    linkHover: violetDark.violet11,
  },
})
