import ThemeProvider from "../components/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            darkMode: 'class'
          }
        ` }} />
        <style>{`
          :root {
            --bg: #f8fafc;
            --text: #0f172a;
          }
          .dark {
            --bg: #0f172a;
            --text: #e6eef8;
          }
          body {
            background-color: var(--bg);
            color: var(--text);
            transition: background-color 0.3s ease, color 0.3s ease;
          }
        `}</style>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('theme');
              if(!t){
                var m = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
                t = (m && m.matches) ? 'dark' : 'light';
              }
              if(t === 'dark'){
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch(e){}
          })();
        ` }} />
      </head>
      <body className="antialiased m-0 p-0 min-h-screen font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}