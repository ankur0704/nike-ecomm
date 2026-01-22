import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
        <body>
            <div className="min-h-screen bg-[var(--color-light-100)] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                
                {children}
            </div>
            </div>

        </body>
    </html>
    
  );
}