// path : `app/layout.js` 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";
import RedirectAction from './copilotkit/actions/RedirectAction';
import JokesAction from "./copilotkit/actions/JokesAction";
import { GoogleGenerativeAIAdapter } from "@copilotkit/runtime";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=content_copy" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOTKIT_API_KEY}// Use any value or dummy (only needed for Copilot Cloud popup suggestions)
          chatApi={{
            url: "/api/copilotkit/chat_2", // this should point to above API route
          }}>
          {/* <JokesAction /> * / }
          {children}
        </CopilotKit> */}
        {/* Make sure to use the URL you configured in the previous step  */}
       
          <CopilotKit runtimeUrl="/api/copilotkit/chat_2">
            {children}
          </CopilotKit>
      
      </body>
    </html>
  );
}
