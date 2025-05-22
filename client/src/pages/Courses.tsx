import { useState, useMemo } from "react";
import { courses, categories, levels } from "@/data/courses";
import CourseCard from "@/components/courses/CourseCard";
import CourseFilters from "@/components/courses/CourseFilters";

// Define Course type based on courses.ts
type Course = {
  id: string;
  title: string;
  banner: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
    social: {
      twitter: string;
      linkedin: string;
    };
  };
  description: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  rating: number;
  language: string;
  enrollment: number;
  badges?: string[];
  prerequisites: string[];
  targetAudience: string[];
  requirements: string[];
  reviews: { user: string; rating: number; comment: string; date: string }[];
  relatedCourses: string[];
  modules: {
    title: string;
    lessons: {
      title: string;
      description: string;
      videoUrl: string;
      resources: { type: string; label: string; url: string }[];
    }[];
  }[];
};

const getUniqueLanguages = (courses: Course[]): string[] => Array.from(new Set(courses.map((c) => c.language)));
const PAGE_SIZE = 8;

const Courses = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sort, setSort] = useState("popularity");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Auto-suggest logic
  const autoSuggest = useMemo(() => {
    if (!search) return [];
    return courses
      .map(c => c.title)
      .filter(title => title.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search]);
  const onAutoSuggestSelect = (val: string) => setSearch(val);

  // Filtering
  let filteredCourses = courses.filter(course => {
    return (
      (!search || course.title.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedCategory || course.category === selectedCategory) &&
      (!selectedLevel || course.level === selectedLevel) &&
      (!selectedDuration || course.duration === selectedDuration) &&
      (!selectedPrice || (selectedPrice === "free" ? course.price === 0 : course.price > 0)) &&
      (!selectedRating || course.rating >= parseFloat(selectedRating)) &&
      (!selectedLanguage || course.language === selectedLanguage)
    );
  });

  // Sorting
  filteredCourses = [...filteredCourses].sort((a, b) => {
    if (sort === "popularity") return b.enrollment - a.enrollment;
    if (sort === "newest") return b.id.localeCompare(a.id); // assuming id encodes recency
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);
  const pagedCourses = filteredCourses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Wishlist logic
  const toggleWishlist = (id: string) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  };

  // Tags for topic-based browsing
  const tags = useMemo(() => Array.from(new Set(courses.flatMap(c => c.badges || []))), []);
  const [selectedTag, setSelectedTag] = useState("");
  const tagFilteredCourses = selectedTag ? pagedCourses.filter(c => c.badges?.includes(selectedTag)) : pagedCourses;

  return (
    <main className="container-padding">
      <h2 className="section-heading">Courses</h2>
      <div className="section-divider" />
      <CourseFilters
        search={search}
        setSearch={setSearch}
        autoSuggest={autoSuggest}
        onAutoSuggestSelect={onAutoSuggestSelect}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        sort={sort}
        setSort={setSort}
        view={view as "grid" | "list"}
        setView={setView}
        categories={categories}
        levels={levels}
        languages={getUniqueLanguages(courses)}
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedTag === tag ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
            onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8" : "flex flex-col gap-4 mt-8"}>
        {tagFilteredCourses.length ? (
          tagFilteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              view={view as "grid" | "list"}
              wishlisted={wishlist.includes(course.id)}
              onToggleWishlist={() => toggleWishlist(course.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-12">No courses found.</div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

export default Courses; 