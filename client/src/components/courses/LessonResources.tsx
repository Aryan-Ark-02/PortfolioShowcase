interface Resource {
  type: string;
  label: string;
  url: string;
}
const icons: Record<string, string> = {
  pdf: "📄",
  code: "💻",
  slides: "📊",
  default: "🔗"
};
const LessonResources = ({ resources }: { resources: Resource[] }) => (
  <div className="mt-6">
    <h4 className="font-bold mb-2 text-foreground">Resources</h4>
    {resources && resources.length ? (
      <ul className="space-y-2">
        {resources.map((res, i) => (
          <li key={i}>
            <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <span>{icons[res.type] || icons.default}</span>
              <span>{res.label}</span>
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-muted-foreground">No resources for this lesson.</div>
    )}
  </div>
);
export default LessonResources; 