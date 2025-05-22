interface LessonVideoProps {
  videoUrl: string;
}
const LessonVideo = ({ videoUrl }: LessonVideoProps) => (
  <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden shadow-md">
    {videoUrl ? (
      <video controls className="w-full h-full rounded-lg" aria-label="Lesson video">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <div className="flex items-center justify-center h-full text-muted-foreground">No video available.</div>
    )}
  </div>
);
export default LessonVideo; 