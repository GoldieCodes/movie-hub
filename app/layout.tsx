import Nav from "./components/Nav"
import QueryProvider from "./components/QueryProvider"
import { PT_Serif, Josefin_Sans, Outfit } from "next/font/google"
import "./globals.css"

// IMPORTING GOOGLE FONT Outfit WITH SPECIFIED WEIGHTS AND USING CSS VARIABLE FOR FONT FAMILY
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--Outfit",
  display: "swap",
  weight: ["400"],
})
// IMPORTING GOOGLE FONT PT Serif WITH SPECIFIED WEIGHTS AND USING CSS VARIABLE FOR FONT FAMILY
const ptSerif = PT_Serif({
  subsets: ["latin"],
  variable: "--PTSerif",
  display: "swap",
  weight: ["700"],
})
// IMPORTING GOOGLE FONT Josefin Sans WITH SPECIFIED WEIGHTS AND USING CSS VARIABLE FOR FONT FAMILY
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--JosefinSans",
  display: "swap",
  weight: ["700"],
})

//METADATA FOR THE WEBSITE
export const metadata = {
  title: "BloocodeMovies",
  description: "All in one movie hub",
  openGraph: {
    title: "BloocodeMovies",
    description: "All in one movie hub",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${ptSerif.variable} ${josefinSans.variable} antialiased`}
      >
        <QueryProvider>
          <Nav />
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
