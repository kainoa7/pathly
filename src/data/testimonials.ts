interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  role?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Chen",
    rating: 5,
    review: "Pathly helped me discover my passion for software engineering. Now I'm interning at Google!",
    role: "CS Student @ Stanford"
  },
  {
    id: 2,
    name: "Sarah Miller",
    rating: 5,
    review: "Switched from Biology to Data Science thanks to Pathly's guidance. Just landed my dream role at Meta.",
    role: "Data Science Graduate"
  },
  {
    id: 3,
    name: "James Wilson",
    rating: 5,
    review: "The career roadmap was spot on! Now I'm working as a Product Manager at Microsoft.",
    role: "Product Manager"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    rating: 5,
    review: "Pathly showed me how my love for creativity could lead to UX Design. Currently at Apple!",
    role: "UX Designer"
  }
]; 