interface Lesson {
  title: string;
  description: string;
}
interface Module {
  title: string;
  lessons: Lesson[];
}
const CourseOutline = ({ modules }: { modules: Module[] }) => (
  <div className="space-y-6">
    {modules.map((mod, i) => (
      <div key={i} className="bg-secondary rounded-lg p-4">
        <h4 className="font-bold text-lg mb-2 text-primary">{mod.title}</h4>
        <ul className="list-disc ml-6">
          {mod.lessons.map((lesson, j) => (
            <li key={j} className="text-foreground mb-1">
              <span className="font-medium">{lesson.title}</span>: {lesson.description}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
export default CourseOutline; 