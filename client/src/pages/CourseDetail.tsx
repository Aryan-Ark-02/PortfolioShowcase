import { useParams, Link } from "wouter";
import { useState } from "react";
import { courses } from "@/data/courses";
import CourseOutline from "@/components/courses/CourseOutline";
import InstructorBio from "@/components/courses/InstructorBio";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/courses/CourseCard";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);
  const [reviewFilter, setReviewFilter] = useState(0);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [previewLesson, setPreviewLesson] = useState<{title: string, videoUrl: string} | null>(null);
  if (!course) return <div className="container-padding text-center">Course not found.</div>;

  // Related courses
  const related = courses.filter(c => course.relatedCourses?.includes(c.id));

  // Reviews
  const filteredReviews = reviewFilter ? course.reviews.filter(r => r.rating === reviewFilter) : course.reviews;

  return (
    <main className="container-padding">
      <section className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Left/Main Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 text-foreground">{course.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>⏱️ {course.duration || 'N/A'}</span>
            <span>👥 {course.enrollment?.toLocaleString() || 'N/A'} students</span>
            <span>• {course.level || 'N/A'}</span>
            <span>⭐ {course.rating?.toFixed(1) || 'N/A'} <span className="text-yellow-400">({course.reviews?.length || 0} reviews)</span></span>
          </div>
          <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">What You'll Learn</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-base mb-8">
            {[
              'Build responsive websites using HTML5 and CSS3',
              'Create interactive web applications with JavaScript',
              'Develop full-stack applications with React and Node.js',
              'Deploy your applications to the web',
              'Understand web development best practices',
              'Work with databases like MongoDB and MySQL',
            ].map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2"><span className="text-blue-600 dark:text-yellow-400">✓</span> {item}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mb-4 text-foreground">Course Content</h2>
          <div className="rounded-lg border border-border bg-background/80 mb-8">
            {course.modules.map((mod, i) => (
              <div key={i} className="border-b border-border last:border-b-0 bg-secondary/80 rounded-xl my-4 p-4">
                <button className="w-full text-left font-bold text-2xl text-blue-600 dark:text-yellow-400 flex items-center justify-between focus:outline-none mb-2" onClick={() => setExpandedModule(expandedModule === i ? null : i)}>
                  <span>{mod.title}</span>
                  <span className="text-xl">{expandedModule === i ? '▲' : '▼'}</span>
                </button>
                {expandedModule === i && (
                  <ul className="ml-4 mt-2 mb-2 space-y-4">
                    {mod.lessons.map((lesson, j) => (
                      <li key={j} className="flex flex-col md:flex-row md:items-center gap-2 text-lg text-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{lesson.title}</span>
                          <span className="text-base text-muted-foreground">{lesson.description}</span>
                          {j === 0 && (
                            <button className="ml-2 text-base underline text-blue-600 dark:text-yellow-400 hover:text-blue-500 dark:hover:text-yellow-300 font-medium" onClick={() => setPreviewLesson({title: lesson.title, videoUrl: lesson.videoUrl})}>Preview</button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Right/Sidebar Card */}
        <aside className="w-full lg:w-[380px] flex-shrink-0">
          <div className="bg-secondary/80 rounded-xl shadow-lg p-6 flex flex-col items-center">
            <div className="w-full h-40 bg-background rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {course.banner ? (
                <img src={course.banner} alt={course.title} className="object-cover w-full h-full" />
              ) : (
                <span className="text-muted-foreground">No Image</span>
              )}
            </div>
            <div className="w-full flex flex-col items-center mb-4">
              <span className="text-3xl font-bold text-white">{course.price === 0 ? 'Free' : `$${course.price || '89.99'}`}</span>
              {course.price > 0 && <span className="text-red-500 font-semibold text-sm mt-1">55% OFF</span>}
              <span className="text-xs text-muted-foreground mt-1 line-through">{course.price > 0 ? '$199.99' : ''}</span>
            </div>
            <Link href={`/enroll/${course.id}`} className="w-full mb-2"><Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300">Enroll Now</Button></Link>
            <button className="w-full bg-black text-white rounded-lg py-2 font-semibold mt-1 mb-4">Add to Wishlist</button>
            <ul className="w-full text-sm text-muted-foreground space-y-2 mt-2">
              <li>✓ Full lifetime access</li>
              <li>✓ Access on mobile and TV</li>
              <li>✓ Certificate of completion</li>
              <li>✓ 30-day money-back guarantee</li>
            </ul>
          </div>
        </aside>
      </section>
      {/* Preview Modal */}
      {previewLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setPreviewLesson(null)}>
          <div className="bg-background rounded-lg p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
            <h4 className="font-bold mb-2">Preview: {previewLesson.title}</h4>
            <video controls className="w-full rounded mb-2">
              <source src={previewLesson.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="absolute top-2 right-2 text-xl" onClick={() => setPreviewLesson(null)} aria-label="Close preview">×</button>
          </div>
        </div>
      )}
      {/* Reviews & Social Proof */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        <div className="flex gap-2 mb-4">
          <button className={`px-3 py-1 rounded ${reviewFilter === 0 ? "bg-primary text-white" : "bg-secondary text-foreground"}`} onClick={() => setReviewFilter(0)}>All</button>
          {[5,4,3,2,1].map(r => (
            <button key={r} className={`px-3 py-1 rounded ${reviewFilter === r ? "bg-primary text-white" : "bg-secondary text-foreground"}`} onClick={() => setReviewFilter(r)}>{r}★</button>
          ))}
        </div>
        <ul className="space-y-4">
          {filteredReviews.length ? filteredReviews.map((r, i) => (
            <li key={i} className="bg-secondary rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-foreground">{r.user}</span>
                <span className="text-yellow-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <div className="text-muted-foreground">{r.comment}</div>
            </li>
          )) : <li className="text-muted-foreground">No reviews yet.</li>}
        </ul>
      </section>
      {/* Related Courses */}
      {related.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Related Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map(rc => <CourseCard key={rc.id} course={rc} />)}
          </div>
        </section>
      )}
    </main>
  );
};

export default CourseDetail; 