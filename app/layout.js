import "./globals.css";

export const metadata = {
  title: "owl'd — By your side in the dark, for the dawn",
  description: "owl'd — Монгол уламжлалт соёлыг сэргээх dark wear брэнд. Чорос овгийн Ууль тотем.",
  openGraph: {
    title: "owl'd",
    description: "By your side in the dark, for the dawn…",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0B0B0A" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
