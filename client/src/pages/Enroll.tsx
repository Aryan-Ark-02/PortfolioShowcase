import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { courses } from "@/data/courses";
import PaymentForm from "@/components/courses/PaymentForm";
import { Button } from "@/components/ui/button";

const Enroll = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const course = courses.find(c => c.id === id);
  const [paid, setPaid] = useState(false);

  if (!course) return <div className="container-padding text-center">Course not found.</div>;

  const handlePaymentSuccess = () => {
    setPaid(true);
    setTimeout(() => setLocation(`/player/${course.id}`), 1000);
  };

  if (course.price === 0 || paid) {
    setTimeout(() => setLocation(`/player/${course.id}`), 1000);
    return <div className="container-padding text-center">Redirecting to course player...</div>;
  }

  return (
    <main className="container-padding max-w-lg mx-auto">
      <h2 className="section-heading">Enroll in {course.title}</h2>
      <div className="section-divider" />
      <PaymentForm amount={course.price} onSuccess={handlePaymentSuccess} />
    </main>
  );
};

export default Enroll; 