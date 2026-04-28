import Navbar from "../dashboard/Navbar"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background ">
      <Navbar />
      <main className="container py-6 space-y-6 mx-auto">{children}</main>
    </div>
  );
}