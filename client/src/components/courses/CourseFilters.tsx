import { useState } from "react";

interface CourseFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  autoSuggest: string[];
  onAutoSuggestSelect: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedLevel: string;
  setSelectedLevel: (v: string) => void;
  selectedDuration: string;
  setSelectedDuration: (v: string) => void;
  selectedPrice: string;
  setSelectedPrice: (v: string) => void;
  selectedRating: string;
  setSelectedRating: (v: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  categories: string[];
  levels: string[];
  languages: string[];
}

const CourseFilters = ({
  search,
  setSearch,
  autoSuggest,
  onAutoSuggestSelect,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedDuration,
  setSelectedDuration,
  selectedPrice,
  setSelectedPrice,
  selectedRating,
  setSelectedRating,
  selectedLanguage,
  setSelectedLanguage,
  sort,
  setSort,
  view,
  setView,
  categories,
  levels,
  languages
}: CourseFiltersProps) => {
  const [showSuggest, setShowSuggest] = useState(false);
  return (
    <form className="flex flex-wrap gap-4 items-center justify-center mb-6 relative" role="search" aria-label="Course search and filters" onSubmit={e => e.preventDefault()}>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setShowSuggest(true); }}
          placeholder="Search courses..."
          className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground focus:ring-2 focus:ring-primary transition"
          aria-label="Search courses"
          autoComplete="off"
          onBlur={() => setTimeout(() => setShowSuggest(false), 100)}
        />
        {showSuggest && autoSuggest.length > 0 && (
          <ul className="absolute left-0 right-0 bg-background border border-border rounded shadow z-10 mt-1 max-h-40 overflow-auto">
            {autoSuggest.map(s => (
              <li key={s} className="px-4 py-2 hover:bg-secondary cursor-pointer" onMouseDown={() => { onAutoSuggestSelect(s); setShowSuggest(false); }}>{s}</li>
            ))}
          </ul>
        )}
      </div>
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <select
        value={selectedLevel}
        onChange={e => setSelectedLevel(e.target.value)}
        className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground"
        aria-label="Filter by level"
      >
        <option value="">All Levels</option>
        {levels.map(level => <option key={level} value={level}>{level}</option>)}
      </select>
      <select
        value={selectedDuration}
        onChange={e => setSelectedDuration(e.target.value)}
        className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground"
        aria-label="Filter by duration"
      >
        <option value="">All Durations</option>
        <option value="3 weeks">3 weeks</option>
        <option value="4 weeks">4 weeks</option>
        <option value="5 weeks">5 weeks</option>
        <option value="6 weeks">6 weeks</option>
        <option value="8 weeks">8 weeks</option>
      </select>
      <select
        value={selectedPrice}
        onChange={e => setSelectedPrice(e.target.value)}
        className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground"
        aria-label="Filter by price"
      >
        <option value="">All Prices</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
      <select
        value={selectedRating}
        onChange={e => setSelectedRating(e.target.value)}
        className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground"
        aria-label="Filter by rating"
      >
        <option value="">All Ratings</option>
        <option value="4">4★ & up</option>
        <option value="4.5">4.5★ & up</option>
        <option value="5">5★</option>
      </select>
      <select
        value={selectedLanguage}
        onChange={e => setSelectedLanguage(e.target.value)}
        className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground"
        aria-label="Filter by language"
      >
        <option value="">All Languages</option>
        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </select>
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="input input-bordered px-4 py-2 rounded-lg bg-secondary text-foreground"
        aria-label="Sort by"
      >
        <option value="popularity">Most Popular</option>
        <option value="newest">Newest</option>
        <option value="rating">Highest Rated</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
      <div className="flex gap-2 items-center">
        <button type="button" className={`px-2 py-1 rounded ${view === "grid" ? "bg-primary text-white" : "bg-secondary text-foreground"}`} onClick={() => setView("grid")} aria-label="Grid view">▦</button>
        <button type="button" className={`px-2 py-1 rounded ${view === "list" ? "bg-primary text-white" : "bg-secondary text-foreground"}`} onClick={() => setView("list")} aria-label="List view">☰</button>
      </div>
    </form>
  );
};

export default CourseFilters; 