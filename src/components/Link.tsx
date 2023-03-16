import { AnchorHTMLAttributes } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

function Link({ children, className, ...props }: LinkProps) {
    return (
        <a
            className={`underline underline-offset-2 decoration-dashed ${className}`}
            target='_blank'
            {...props}
        >
            {children}
        </a>
    )
}

export default Link
