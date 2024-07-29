"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || 'secret';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('/api/verifyToken/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    // setIsAuthenticated(true);
                } else {
                    console.error('Failed to verify token');
                    localStorage.removeItem('token');
                    router.push('/authentication/login');
                }
            })
            .catch(() => {
                console.error('Failed to verify token');
                localStorage.removeItem('token');
                router.push('/authentication/login');
            });
    } else {
        router.push('/authentication/login');
    }
}, [router]);
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
