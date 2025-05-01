import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Scale, Calculator, Brain, BookOpen, Map, FileText } from "lucide-react";
import Link from "next/link";

export function CategoryFeatures() {
  const categories = [
    {
      title: "Computer Science",
      slug: "computer-science",
      description: "AI, machine learning, algorithms, and software engineering",
      icon: <Beaker className="h-10 w-10 text-chart-1" />,
    },
    {
      title: "Law",
      slug: "law",
      description: "Legal frameworks, case analysis, and jurisprudence",
      icon: <Scale className="h-10 w-10 text-chart-2" />,
    },
    {
      title: "Economics",
      slug: "economics",
      description: "Market analysis, economic theory, and financial models",
      icon: <Calculator className="h-10 w-10 text-chart-3" />,
    },
    {
      title: "Psychology",
      slug: "psychology",
      description: "Cognitive studies, behavioral research, and mental health",
      icon: <Brain className="h-10 w-10 text-chart-4" />,
    },
    {
      title: "Literature",
      slug: "literature",
      description: "Literary analysis, comparative literature, and critical theory",
      icon: <BookOpen className="h-10 w-10 text-chart-5" />,
    },
    {
      title: "Geography",
      slug: "geography",
      description: "Spatial analysis, environmental studies, and human geography",
      icon: <Map className="h-10 w-10 text-chart-1" />,
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="space-y-4 text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Specialized for Every Discipline</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our prompt templates are tailored to the unique requirements of different academic fields.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/templates`}
            className="block"
          >
            <Card className="transition-all duration-300 hover:shadow-md cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                {category.icon}
                <div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}