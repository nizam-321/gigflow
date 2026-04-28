import { TrendingUp } from "lucide-react";

interface Props {
  name?: string;
}

export default function WelcomeBanner({ name }: Props) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="relative overflow-hidden rounded-2xl  p-8 ">
      <h1 className="text-2xl font-bold">
        {greeting}{name ? `, ${name}` : ""}!
      </h1>
      <p className="text-muted-foreground mt-2">
        Welcome back to your dashboard.
      </p>
      <div className="flex items-center gap-2 mt-4 text-accent">
        <TrendingUp size={20} />
        <span>Keep pushing forward!</span>
      </div>
    </div>
  );
}
