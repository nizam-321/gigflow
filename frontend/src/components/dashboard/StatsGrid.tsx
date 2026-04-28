import StatCard from "./StatCard";

interface Props {
  gigsCount: number;
  bidsCount: number;
  unreadCount: number;
}

export default function StatsGrid({ gigsCount, bidsCount, unreadCount }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard title="My Gigs" value={gigsCount} subtitle="active gigs" />
      <StatCard title="Bids Placed" value={bidsCount} subtitle="pending bids" />
      <StatCard title="Notifications" value={unreadCount} subtitle="unread" />
    </div>
  );
}
