import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GigGraphType } from "@/types/gigs";

import { formatCurrency, formatRelativeTime, formatDeadline } from "@/utils/formate";
import { Calendar, DollarSign, User, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";


interface GigCardProps {
  gig: GigGraphType;
}


export default function GigCard({ gig }: GigCardProps) {
  return (
    <Card className="card-hover border-2 border-border/50 hover:border-primary/30 overflow-hidden group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {gig.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {gig.postedByName}
              </p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 font-semibold"
          >
            {gig.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed whitespace-pre-wrap">
          {gig.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {gig.skills?.slice(0, 3).map((skill, index) => (
            <Badge 
              key={skill} 
              variant="outline" 
              className="text-xs border-primary/30 hover:bg-primary/10 transition-colors fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {skill}
            </Badge>
          ))}
          {(gig.skills?.length || 0) > 3 && (
            <Badge variant="outline" className="text-xs border-accent/30 bg-accent/5">
              +{(gig.skills?.length || 0) - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-primary font-bold text-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            {formatCurrency(gig.budget)}
          </div>
          {gig.deadline && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              {formatDeadline(gig.deadline)}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between bg-muted/30 relative">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          Posted {formatRelativeTime(gig.createdAt)}
        </div>
        <Link to={`/gigs/${gig._id}`}>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md btn-hover-lift group"
          >
            <span className="flex items-center gap-1.5">
              View Details
              <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
