interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}
