import { useState } from "react";
import { useLocation } from "wouter";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    banner: string;
    instructor: { name: string; avatar: string };
    duration: string;
    price: number;
    level: string;
    rating: number;
    language: string;
    enrollment: number;
    badges: string[];
    description?: string;
    modules?: { lessons: { videoUrl: string }[] }[];
  };
  view?: "grid" | "list";
  wishlisted?: boolean;
  onToggleWishlist?: () => void;
}

const CourseCard = ({ course, view = "grid", wishlisted = false, onToggleWishlist }: CourseCardProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [, setLocation] = useLocation();

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if not clicking on a button
    if ((e.target as HTMLElement).closest("button, a")) return;
    setLocation(`/course/${course.id}`);
  };

  return (
    <div
      className={`relative card-hover rounded-xl overflow-hidden shadow-md bg-card transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${view === "list" ? "flex" : "block"} cursor-pointer`}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${course.title}`}
      onClick={handleCardClick}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleCardClick(e as any); }}
    >
      <img src={course.banner} alt={course.title} className={view === "list" ? "h-32 w-48 object-cover flex-shrink-0" : "w-full h-40 object-cover"} />
      <div className={view === "list" ? "flex-1 p-4 flex flex-col justify-between" : "p-4"}>
        <div className="flex items-center gap-2 mb-2">
          {course.badges?.map(badge => (
            <span key={badge} className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded mr-1">{badge}</span>
          ))}
        </div>
        <h3 className="text-lg font-bold mb-1 text-foreground">{course.title}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <img src={course.instructor.avatar} alt={course.instructor.name} className="w-6 h-6 rounded-full" />
          <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.language}</span>
          <span>•</span>
          <span>{course.enrollment} enrolled</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500">{"★".repeat(Math.round(course.rating))}{"☆".repeat(5 - Math.round(course.rating))}</span>
          <span className="text-xs text-muted-foreground">{course.rating.toFixed(1)}</span>
        </div>
        {view === "list" && course.description && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{course.description}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-primary">{course.price === 0 ? "Free" : `$${course.price}`}</span>
          <button
            className={`ml-2 text-xl ${wishlisted ? "text-red-500" : "text-muted-foreground"}`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={e => { e.stopPropagation(); onToggleWishlist && onToggleWishlist(); }}
            tabIndex={0}
          >
            {wishlisted ? "♥" : "♡"}
          </button>
          <button
            className="ml-2 text-xs underline text-primary hover:text-primary/80"
            onClick={e => { e.stopPropagation(); setShowPreview(true); }}
            tabIndex={0}
            aria-label="Quick preview"
          >
            Sample Lesson
          </button>
        </div>
        {showPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowPreview(false)}>
            <div className="bg-background rounded-lg p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
              <h4 className="font-bold mb-2">Sample Lesson: {course.title}</h4>
              <video controls className="w-full rounded mb-2">
                <source src={course.modules?.[0]?.lessons?.[0]?.videoUrl || ""} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button className="absolute top-2 right-2 text-xl" onClick={() => setShowPreview(false)} aria-label="Close preview">×</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard; 