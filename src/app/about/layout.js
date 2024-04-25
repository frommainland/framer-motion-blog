import Link from 'next/link';
import React from 'react';

function AboutLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <div>132</div>
                <Link href='/introduction?catergory=Introduction'>back</Link>
            </body>
        </html>
    );
}

export default AboutLayout;