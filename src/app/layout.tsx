import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'AuthFlow',
  description: 'A colorful, animated authentication flow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased bg-gradient-to-br from-background via-blue-100 to-cyan-100">
        <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
