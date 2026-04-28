import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

import { fetchGigById } from "@/store/slices/gigsSlice";
import { submitBid, fetchBidsForGig, hireBid } from "@/store/slices/bidsSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Calendar, DollarSign, User, AlertCircle, CheckCircle } from "lucide-react";
import { formatCurrency, formatRelativeTime, formatDeadline } from "@/utils/formate";

export default function GigDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentGig, loading: gigLoading } = useSelector((state: RootState) => state.gigs);
  const { gigBids, loading: bidsLoading, error: bidsError } = useSelector((state: RootState) => state.bids);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [message, setMessage] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidSuccess, setBidSuccess] = useState("");
  const [bidError, setBidError] = useState("");
  const [hireSuccess, setHireSuccess] = useState("");

  const isOwner = currentGig && user && (currentGig.ownerId === (user as { id: string }).id || 
    currentGig.ownerId === (user as { _id?: string })._id);

  useEffect(() => {
    if (id) {
      dispatch(fetchGigById(id));
    }
  }, [id, dispatch]);

  // If owner, also fetch bids
  useEffect(() => {
    if (currentGig && isOwner && id) {
      dispatch(fetchBidsForGig(id));
    }
  }, [currentGig, isOwner, id, dispatch]);

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setBidError("");
    setBidSuccess("");

    if (!message.trim()) {
      return setBidError("Please enter a message for your bid");
    }

    const amountNum = Number.parseFloat(bidAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return setBidError("Please enter a valid bid amount");
    }

    if (!isAuthenticated) {
      return navigate("/login");
    }

    const res = await dispatch(submitBid({ gigId: id!, message, amount: amountNum }));
    if (submitBid.fulfilled.match(res)) {
      setBidSuccess("Your bid has been submitted successfully!");
      setMessage("");
      setBidAmount("");
    } else {
      setBidError(res.payload as string || "Failed to submit bid");
    }
  };

  const handleHire = async (bidId: string) => {
    setHireSuccess("");
    const res = await dispatch(hireBid(bidId));
    if (hireBid.fulfilled.match(res)) {
      setHireSuccess("Freelancer hired successfully!");
      // Refresh gig details
      if (id) dispatch(fetchGigById(id));
    }
  };

  if (gigLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading gig details...</p>
        </div>
      </div>
    );
  }

  if (!currentGig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Gig not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Gig Info */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl">{currentGig.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  <User className="w-3 h-3 inline mr-1" />
                  Posted by {currentGig.postedByName}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={currentGig.status === "open" ? "default" : "secondary"}>
                  {currentGig.status}
                </Badge>
                {currentGig.category && (
                  <Badge variant="outline">{currentGig.category}</Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{currentGig.description}</p>

            {currentGig.skills && currentGig.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentGig.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center text-primary font-semibold">
                <DollarSign className="w-4 h-4 mr-1" />
                {formatCurrency(currentGig.budget)}
              </div>
              {currentGig.deadline && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDeadline(currentGig.deadline)}
                </div>
              )}
              <span className="text-muted-foreground">
                Posted {formatRelativeTime(currentGig.createdAt)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Bid Submission (non-owners only, gig must be open) */}
        {!isOwner && currentGig.status === "open" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Submit Your Bid</CardTitle>
            </CardHeader>
            <CardContent>
              {!isAuthenticated ? (
                <p className="text-muted-foreground">
                  <Link to="/login" className="text-primary underline">Log in</Link> to submit a bid.
                </p>
              ) : (
                <form onSubmit={handleSubmitBid} className="space-y-4">
                  {bidError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{bidError}</AlertDescription>
                    </Alert>
                  )}
                  {bidSuccess && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>{bidSuccess}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <Textarea
                      placeholder="Describe your approach for this project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="mb-4"
                    />
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <span className="text-sm font-medium">Total</span>
                    </div>
                  </div>
                  <Button type="submit" disabled={bidsLoading}>
                    {bidsLoading ? "Submitting..." : "Submit Bid"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* Bids Management (owner only) */}
        {isOwner && (
          <Card>
            <CardHeader>
              <CardTitle>Bids Received</CardTitle>
            </CardHeader>
            <CardContent>
              {hireSuccess && (
                <Alert className="mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{hireSuccess}</AlertDescription>
                </Alert>
              )}
              {bidsLoading ? (
                <p className="text-muted-foreground">Loading bids...</p>
              ) : bidsError ? (
                <p className="text-destructive">{bidsError}</p>
              ) : gigBids.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No bids yet.</p>
              ) : (
                <div className="space-y-4">
                  {gigBids.map((bid: any) => (
                    <div key={bid._id} className="rounded-lg border p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            {bid.freelancerId?.name || "Freelancer"}
                          </span>
                          <Badge
                            variant={
                              bid.status === "hired"
                                ? "default"
                                : bid.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {bid.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{bid.freelancerId?.email}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(bid.amount)}
                          </span>
                          <span className="text-sm text-muted-foreground">Bid amount</span>
                        </div>
                        <p className="text-sm mt-3 border-l-2 border-primary/20 pl-3 py-1 bg-primary/5 rounded-r-md">
                          {bid.message}
                        </p>
                      </div>
                      {bid.status === "pending" && currentGig.status === "open" && (
                        <Button
                          size="sm"
                          onClick={() => handleHire(bid._id)}
                          disabled={bidsLoading}
                        >
                          Hire
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
