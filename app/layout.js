import "./globals.css";

export const metadata = {
  title: "零時迴圈｜每小時生長的網頁 RPG",
  description: "每一次選擇都會留下痕跡。故事每小時持續更新，直到 7 月 31 日迎來結局。",
  openGraph: {
    title: "零時迴圈｜AutoRPG",
    description: "一款會隨時間生長的分支劇情網頁 RPG。",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070914",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
