import './globals.css'
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import styles from './page.module.scss'
import "the-new-css-reset/css/reset.css";
import localFont from 'next/font/local'
import { GlobalContextProvider } from './context/SidebarContext'
import { SidebarMenuProvider } from './context/sidebarMenuContext'

const newKansas = localFont({
    src: './font/newKansas/NewKansasTRIAL-SemiBold.otf',
    variable: '--font-kansas'
})


const Roobert = localFont({
    src: [
        {
            path: './font/roobert/RoobertTRIAL-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './font/roobert/RoobertTRIAL-Light.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: './font/roobert/RoobertTRIAL-Bold.otf',
            weight: '500',
            style: 'normal',
        },
    ],
    variable: '--font-roobert'
})

const input = localFont({
    src: './font/InputMono-Regular.ttf',
    variable: '--font-input'
})

const inter = localFont({
    src: './font/Inter-VariableFont_slnt,wght.ttf',
    variable: '--font-inter'
})


export const metadata = {
    title: 'Motion Book',
    description: "A designer's notebook to learn framer motion",
}

export default function RootLayout({ children }) {

    const theme = "dark"

    return (
        <html lang="en" style={theme == 'light' ? LIGHT_TOKENS : DARK_TOKENS}>
            <body className={`${Roobert.variable} ${newKansas.variable} ${input.variable} ${inter.variable}`}>
                <GlobalContextProvider>
                    <SidebarMenuProvider>
                        <Header theme={theme} />
                        {children}
                    </SidebarMenuProvider>
                </GlobalContextProvider>
            </body>
        </html>
    )
}

