import { useParams } from "wouter";
import { useState, useEffect, useRef } from "react";
import { courses } from "@/data/courses";
import SidebarNav from "@/components/courses/SidebarNav";
import LessonVideo from "@/components/courses/LessonVideo";
import LessonResources from "@/components/courses/LessonResources";
import CourseCard from "@/components/courses/CourseCard";

const getLessonKey = (courseId: string | undefined, moduleIdx: number, lessonIdx: number) => `${courseId || ""}-m${moduleIdx}-l${lessonIdx}`;

type Quiz = { question: string; options: string[]; answer: number };

const CoursePlayer = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [note, setNote] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [discussion, setDiscussion] = useState<string[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Resume progress from localStorage
    const saved = localStorage.getItem(`progress-${id || ""}`);
    if (saved) {
      const { module, lesson } = JSON.parse(saved);
      setCurrentModule(module);
      setCurrentLesson(lesson);
    }
  }, [id]);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem(`progress-${id || ""}`,
      JSON.stringify({ module: currentModule, lesson: currentLesson })
    );
    // Load note/bookmark
    setNote(localStorage.getItem(getLessonKey(id, currentModule, currentLesson) + "-note") || "");
    setBookmarked(!!localStorage.getItem(getLessonKey(id, currentModule, currentLesson) + "-bookmark"));
    try {
      setDiscussion(JSON.parse(localStorage.getItem(getLessonKey(id, currentModule, currentLesson) + "-discussion") || "[]"));
    } catch {
      setDiscussion([]);
    }
  }, [id, currentModule, currentLesson]);

  if (!course) return <div className="container-padding text-center">Course not found.</div>;

  const module = course.modules[currentModule];
  const lesson = module.lessons[currentLesson];
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = currentModule * module.lessons.length + currentLesson + 1;
  const progress = (completedLessons / totalLessons) * 100;

  // Recommendations
  const recommendations = courses.filter(c => c.id !== id).slice(0, 3);

  // Certificate (dummy)
  const handleDownloadCertificate = () => {
    const blob = new Blob([
      `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='#fff'/><text x='50%' y='40%' font-size='32' text-anchor='middle' fill='#003366'>Certificate of Completion</text><text x='50%' y='55%' font-size='24' text-anchor='middle' fill='#0099cc'>${course.title}</text><text x='50%' y='70%' font-size='20' text-anchor='middle' fill='#333'>Awarded to You</text></svg>`
    ], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${course.id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Accessibility: transcript (dummy)
  const transcript = `Transcript for ${lesson.title}: This is a sample transcript for accessibility.`;

  // Quizzes (dummy)
  const quiz: Quiz = (lesson as any).quiz || { question: "What did you learn?", options: ["A", "B", "C"], answer: 0 };
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<string>("");

  const handleQuizSubmit = () => {
    setQuizResult(quizAnswer === quiz.answer ? "Correct!" : "Try again.");
  };

  // Note-taking
  const handleNoteSave = () => {
    localStorage.setItem(getLessonKey(id, currentModule, currentLesson) + "-note", note || "");
  };

  // Bookmark
  const handleBookmark = () => {
    setBookmarked(b => {
      if (!b) localStorage.setItem(getLessonKey(id, currentModule, currentLesson) + "-bookmark", "1");
      else localStorage.removeItem(getLessonKey(id, currentModule, currentLesson) + "-bookmark");
      return !b;
    });
  };

  // Discussion
  const handleAddDiscussion = (msg: string) => {
    const updated = [...discussion, msg];
    setDiscussion(updated);
    localStorage.setItem(getLessonKey(id, currentModule, currentLesson) + "-discussion", JSON.stringify(updated));
  };

  return (
    <main className="container-padding grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <aside className="md:col-span-1 bg-secondary/60 border-r border-border rounded-lg p-4 md:sticky md:top-24 h-fit min-h-[300px]">
        <SidebarNav
          modules={course.modules}
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
        />
        <div className="mt-8 p-4 bg-background rounded-lg shadow-sm sticky bottom-0 z-10">
          <div className="font-bold mb-2">Progress</div>
          <div className="progress-bar mb-2">
            <div className="progress-value progress-animate" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-sm mb-2">{progress.toFixed(0)}% complete</div>
          {progress === 100 && <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-semibold">Completed</span>}
          <div className="flex flex-wrap gap-2 mt-2">
            <button className="text-xs underline text-primary" onClick={() => { setCurrentModule(0); setCurrentLesson(0); }}>Restart</button>
            <button className="text-xs underline text-primary" onClick={() => {
              const saved = localStorage.getItem(`progress-${id || ""}`);
              if (saved) {
                const { module, lesson } = JSON.parse(saved);
                setCurrentModule(module);
                setCurrentLesson(lesson);
              }
            }}>Resume</button>
            {progress === 100 && <button className="text-xs underline text-primary" onClick={() => setShowCertificate(true)}>Download Certificate</button>}
          </div>
        </div>
      </aside>
      <section className="md:col-span-1">
        <div className="bg-secondary rounded-lg p-4 flex justify-center shadow-md">
          <video
            ref={videoRef}
            controls
            className="rounded-lg shadow-lg mb-4"
            style={{ width: '80%', maxWidth: '900px', height: 'auto' }}
            aria-label="Lesson video"
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-8 space-y-8">
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
            <p className="text-muted-foreground mb-4">{lesson.description}</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm border-t border-border">
            <div className="font-bold mb-2">Lesson Q&A</div>
            <ul className="mb-2 space-y-1">
              {discussion.map((msg, i) => <li key={i} className="text-sm text-muted-foreground">{msg}</li>)}
            </ul>
            <form onSubmit={e => { e.preventDefault(); const val = (e.target as any).elements.msg.value; if (val) { handleAddDiscussion(val); (e.target as any).reset(); } }}>
              <input name="msg" className="input input-bordered px-2 py-1 rounded mr-2" placeholder="Ask a question or comment..." aria-label="Ask a question" />
              <button type="submit" className="px-2 py-1 rounded bg-primary text-white">Post</button>
            </form>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm border-t border-border">
            <div className="font-bold mb-2">Recommended Courses</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendations.map(rc => <CourseCard key={rc.id} course={rc} />)}
            </div>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm border-t border-border">
            <LessonResources resources={lesson.resources} />
          </div>
        </div>
      </section>
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowCertificate(false)}>
          <div className="bg-background rounded-lg p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
            <h4 className="font-bold mb-2">Certificate of Completion</h4>
            <p className="mb-4">Congratulations! You have completed the course.</p>
            <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleDownloadCertificate}>Download Certificate</button>
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowCertificate(false)} aria-label="Close certificate">×</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CoursePlayer; 