import { styled } from '../../stitches.config'

export const Link = styled('a', {
    'color': '$link',
    'textDecoration': 'none',
    '&:hover': {
        textDecoration: 'underline',
        color: '$linkHover',
    },
})
