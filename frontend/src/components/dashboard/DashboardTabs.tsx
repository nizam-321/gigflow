import {
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function DashboardTabs() {
  return (
    <TabsList className="grid grid-cols-3 w-[250px]">
      <TabsTrigger value="gigs">My Gigs</TabsTrigger>
      <TabsTrigger value="bids">My Bids</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
    </TabsList>
  );
}
