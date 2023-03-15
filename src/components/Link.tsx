import { AnchorHTMLAttributes } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
    return (
        <a
            href={href}
            className='text-blue-600 hover:text-blue-800 hover:underline'
            {...props}
        >
            {children}
        </a>
    )
}

export default Link
