import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Header from "@/components/header";

// npx inngest-cli@latest dev (write this in separate terminal to start the inngest)
export const metadata = {
  title: "AI Career Coach",
  description: "This is a AI Career Coach which will help you to find your dream job",
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`&{inter.className}`}>
        <ClerkProvider>
<Header />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen">{children}</main>
            <footer className="bg-muted/50 py-10 ">
              <div className="container mx-auto text-center">Made with ❤️ by Jay</div>

            </footer>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
