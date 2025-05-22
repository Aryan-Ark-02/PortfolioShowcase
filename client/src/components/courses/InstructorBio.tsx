interface Instructor {
  name: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}
const InstructorBio = ({ instructor }: { instructor: Instructor }) => (
  <div className="flex items-center gap-4 mt-2">
    <img src={instructor.avatar} alt={instructor.name} className="w-12 h-12 rounded-full border-2 border-primary" />
    <div>
      <div className="font-bold text-foreground flex items-center gap-2">
        {instructor.name}
        {instructor.social?.twitter && (
          <a href={instructor.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-primary hover:underline text-sm">🐦</a>
        )}
        {instructor.social?.linkedin && (
          <a href={instructor.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-primary hover:underline text-sm">in</a>
        )}
      </div>
      <div className="text-sm text-muted-foreground">{instructor.bio}</div>
    </div>
  </div>
);
export default InstructorBio; 