interface SidebarNavProps {
  modules: { title: string; lessons: { title: string }[] }[];
  currentModule: number;
  setCurrentModule: (i: number) => void;
  currentLesson: number;
  setCurrentLesson: (i: number) => void;
}
const SidebarNav = ({ modules, currentModule, setCurrentModule, currentLesson, setCurrentLesson }: SidebarNavProps) => (
  <nav aria-label="Course navigation" className="space-y-6 bg-background/80 rounded-lg p-4 shadow-sm border border-border">
    {modules.map((mod, i) => (
      <div key={i} className="mb-2">
        <button
          className={`w-full text-left font-bold text-primary py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${i === currentModule ? 'bg-primary/10' : ''}`}
          onClick={() => { setCurrentModule(i); setCurrentLesson(0); }}
          aria-expanded={i === currentModule}
        >
          {mod.title}
        </button>
        {i === currentModule && (
          <ul className="ml-4 mt-2 space-y-1">
            {mod.lessons.map((lesson, j) => (
              <li key={j}>
                <button
                  className={`w-full text-left px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-primary ${j === currentLesson ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary'}`}
                  onClick={() => setCurrentLesson(j)}
                  aria-current={j === currentLesson ? 'true' : undefined}
                >
                  {lesson.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </nav>
);
export default SidebarNav; 