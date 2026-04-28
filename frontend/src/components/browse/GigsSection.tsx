import GigCard from "@/components/gigs/GigCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Search } from "lucide-react";
import type { GigGraphType } from "@/types/gigs";

interface Props {
  gigs: GigGraphType[];
  loading: boolean;
}

export default function GigsSection({ gigs, loading }: Props) {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="mb-10 fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Available Gigs</h2>
          </div>
          {!loading && (
            <p className="text-muted-foreground text-lg ml-13">
              {gigs.length} {gigs.length === 1 ? "gig" : "gigs"} found
            </p>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl skeleton" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && gigs.length === 0 && (
          <div className="text-center py-20 fade-in">
            <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No gigs found</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Try adjusting your search criteria or check back later for new opportunities
            </p>
          </div>
        )}

        {/* DATA */}
        {!loading && gigs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gigs.map((gig, index) => (
              <div 
                key={gig._id} 
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GigCard gig={gig} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
