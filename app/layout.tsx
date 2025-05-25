export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical CSS */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="preload" href="/_next/static/css/app/globals.css" as="style" />

        {/* Optimize CSS delivery */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Critical CSS inlining for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .min-h-screen { min-height: 100vh; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-1 { flex: 1 1 0%; }
            /* Header critical styles */
            header { position: sticky; top: 0; z-index: 50; background: white; border-bottom: 1px solid #e5e7eb; }
            /* Footer critical styles */
            footer { background: white; padding: 3rem 0; }
          `
        }} />

        {/* Load stylesheets directly, no onLoad handler */}
        <link rel="stylesheet" href="/_next/static/css/chunks/pages/_app.css" />
        <noscript><link rel="stylesheet" href="/_next/static/css/chunks/pages/_app.css" /></noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
