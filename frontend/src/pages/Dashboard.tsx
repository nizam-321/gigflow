import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { useNavigate, Link } from "react-router-dom";
import { fetchMyGigs } from "@/store/slices/gigsSlice";
import { fetchMyBids } from "@/store/slices/bidsSlice";
import { fetchNotifications, markAsRead } from "@/store/slices/notificationsSlice";
import { socket } from "@/socket";

import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsGrid from "@/components/dashboard/StatsGrid";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const { myGigs, loading: gigsLoading } = useSelector((state: RootState) => state.gigs);
  const { myBids, loading: bidsLoading } = useSelector((state: RootState) => state.bids);
  const { items: notifications, unreadCount, loading: notifLoading } = useSelector(
    (state: RootState) => state.notifications
  );

  // 🔁 Fetch data when user is available
  useEffect(() => {
    if (user) {
      dispatch(fetchMyGigs());
      dispatch(fetchMyBids());
      dispatch(fetchNotifications());

      // Socket listener for real-time notifications
      socket.on("notification", () => {
        dispatch(fetchNotifications());
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [user, dispatch]);

  return (
    <DashboardLayout>
      <WelcomeBanner name={user?.name} />

      {/* Stats Cards */}
      <StatsGrid
        gigsCount={myGigs.length}
        bidsCount={myBids.length}
        unreadCount={unreadCount}
      />

      <Tabs defaultValue="gigs" className="w-full">
        {/* Tabs Header */}
        <DashboardTabs />

        {/* ================= My Gigs ================= */}
        <TabsContent value="gigs">
          {gigsLoading ? (
            <p className="text-center text-muted-foreground">Loading gigs...</p>
          ) : myGigs.length === 0 ? (
            <div className="rounded-xl border p-8 text-center">
              <p className="text-muted-foreground">
                You haven’t posted any gigs yet
              </p>
              <button 
              onClick={() => navigate("/postgig")}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all font-medium">
                Post Your First Gig
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {myGigs.map((gig) => (
                <div key={gig._id} className="rounded-lg border p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{gig.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Budget: {gig.budget} · Status: {gig.status}
                    </p>
                  </div>
                  <Link to={`/gigs/${gig._id}`}>
                    <button className="px-3 py-1 text-sm border rounded hover:bg-accent">
                      View Bids
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ================= My Bids ================= */}
        <TabsContent value="bids">
          {bidsLoading ? (
            <p className="text-center text-muted-foreground">Loading bids...</p>
          ) : myBids.length === 0 ? (
            <div className="rounded-xl border p-8 text-center">
              <p className="text-muted-foreground">
                You haven’t placed any bids yet
              </p>
              <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all font-medium">
                Browse Gigs
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {myBids.map((bid) => (
                <div key={bid._id} className="rounded-lg border p-4">
                  <h3 className="font-semibold">
                    {typeof bid.gigId === "object" ? bid.gigId.title : "Gig"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {bid.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Status: <span className="font-medium">{bid.status}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ================= Notifications ================= */}
        <TabsContent value="notifications">
          {notifLoading ? (
            <p className="text-center text-muted-foreground">
              Loading notifications...
            </p>
          ) : notifications.length === 0 ? (
            <div className="rounded-xl border p-8 text-center">
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => !notif.isRead && dispatch(markAsRead(notif._id))}
                  className={`rounded-lg border p-4 flex justify-between items-center transition-colors ${
                    !notif.isRead ? "bg-primary/5 cursor-pointer hover:bg-primary/10" : "bg-card"
                  }`}
                >
                  <div>
                    <p className={!notif.isRead ? "font-medium" : ""}>{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!notif.isRead && (
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}



