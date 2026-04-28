import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

import { fetchOpenGigs, searchGigs } from "@/store/slices/gigsSlice";

import BrowseNavbar from "@/components/browse/BrowseNavbar";
import BrowseHero from "@/components/browse/BrowseHero";
import GigsSection from "@/components/browse/GigsSection";

export default function BrowseGigs() {
  const dispatch = useDispatch<AppDispatch>();

  const { browseGigs: gigs, loading } = useSelector((state: RootState) => state.gigs);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    dispatch(fetchOpenGigs());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localQuery.trim()) {
      dispatch(fetchOpenGigs());
      return;
    }
    dispatch(searchGigs(localQuery));
  };

  const handleClearSearch = () => {
    setLocalQuery("");
    dispatch(fetchOpenGigs());
  };

  return (
    <div className="min-h-screen bg-background">
      <BrowseNavbar isAuthenticated={isAuthenticated} />

      <BrowseHero
        localQuery={localQuery}
        setLocalQuery={setLocalQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        searchQuery={localQuery}
      />

      <GigsSection gigs={gigs} loading={loading} />
    </div>
  );
}
