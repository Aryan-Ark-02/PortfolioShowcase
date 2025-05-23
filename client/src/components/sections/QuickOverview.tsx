import { ArrowRight } from "lucide-react";

const QuickOverview = () => {
  // Card data
  const overviewCards = [
    {
      title: "About Me",
      description: "Data Science Leader with expertise in AI/ML innovations and 15+ years in the industry.",
      icon: "fa-user-circle",
      link: "about"
    },
    {
      title: "Experience",
      description: "Led AI initiatives at Sirrus.ai, Bajaj FinServ, and Citibank with significant business impact.",
      icon: "fa-briefcase",
      link: "experience"
    },
    {
      title: "Skills",
      description: "GenAI, LLMs, Deep Learning, NLP, Python, TensorFlow, PyTorch, and more.",
      icon: "fa-code",
      link: "skills"
    },
    {
      title: "Services",
      description: "AI strategy consulting, GenAI implementation, LLM fine-tuning, and ML solutions.",
      icon: "fa-hands-helping",
      link: "services"
    }
  ];

  return (
    <section className="py-16 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {overviewCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-secondary dark:bg-secondary rounded-xl p-6 shadow-md transition transform hover:shadow-lg hover:-translate-y-1 duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="text-foreground/70 dark:text-foreground/70 mt-1 text-sm">{card.description.split(' ').slice(0, 4).join(' ')}...</p>
                </div>
                <span className="text-primary dark:text-primary">
                  <i className={`fas ${card.icon}`}></i>
                </span>
              </div>
              <p className="text-foreground/80 dark:text-foreground/80 mb-4">
                {card.description}
              </p>
              <a 
                href={card.link} 
                className="text-primary dark:text-primary font-medium inline-flex items-center hover:underline"
              >
                Learn more <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickOverview;
