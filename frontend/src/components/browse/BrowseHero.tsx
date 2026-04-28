
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Sparkles } from "lucide-react";

interface Props {
  localQuery: string;
  setLocalQuery: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClear: () => void;
  searchQuery: string;
}

export default function BrowseHero({
  localQuery,
  setLocalQuery,
  onSearch,
  onClear,
  searchQuery,
}: Props) {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4 fade-in-delay-1">
            <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight">
              Find Your Next{" "}
              <span className="gradient-text">Freelance Gig</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Browse thousands of opportunities and connect with clients worldwide. 
              Your dream project is just a search away.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={onSearch} className="flex gap-3 max-w-3xl mx-auto fade-in-delay-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <Input
                type="text"
                placeholder="Search gigs by title, category, or skills..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-base border-2 border-border/50 focus:border-primary shadow-lg bg-card/80 backdrop-blur-sm"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={() => setLocalQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button 
              type="submit" 
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg btn-hover-lift font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
            {searchQuery && (
              <Button 
                type="button" 
                variant="outline" 
                size="lg"
                onClick={onClear}
                className="h-14 px-6 border-2 hover:bg-muted/50 btn-hover-lift"
              >
                Clear
              </Button>
            )}
          </form>

          {/* Stats or Features */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 fade-in-delay-3">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">1000+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Gigs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Freelancers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

