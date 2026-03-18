import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import hospitalImg from "@/assets/hospital-modern.jpg";
import keralaImg from "@/assets/kerala-backwaters.jpg";
import goaImg from "@/assets/goa-beach.jpg";
import rajasthanImg from "@/assets/rajasthan-palace.jpg";

const blogs = [
  { slug: "why-india-best-medical-tourism", title: "Why India is the Best Destination for Medical Tourism", excerpt: "India has emerged as a global leader in medical tourism, offering world-class healthcare at affordable prices. With JCI-accredited hospitals, experienced doctors, and a rich cultural heritage, India provides a unique combination of treatment and travel.", date: "March 10, 2026", readTime: "5 min read", img: hospitalImg },
  { slug: "cost-comparison-treatments", title: "Cost Comparison: Medical Treatments in India vs Other Countries", excerpt: "Discover how much you can save on medical procedures in India compared to the US, UK, and Singapore. From cardiac surgery to joint replacement, India offers savings of 60-80% without compromising quality.", date: "March 5, 2026", readTime: "7 min read", img: keralaImg },
  { slug: "top-hospitals-india", title: "Top 10 Hospitals in India for International Patients", excerpt: "A comprehensive guide to India's finest hospitals that cater to international patients with world-class infrastructure, multilingual staff, and dedicated international patient departments.", date: "Feb 28, 2026", readTime: "6 min read", img: goaImg },
  { slug: "recovery-travel-destinations", title: "Best Recovery Travel Destinations in India", excerpt: "After your medical procedure, recover in style at India's most serene destinations. From Kerala's backwaters to Goa's beaches, discover the perfect post-treatment retreat.", date: "Feb 20, 2026", readTime: "4 min read", img: rajasthanImg },
];

const BlogPage = () => (
  <div className="font-body">
    <section className="hero-gradient-bg section-padding">
      <div className="container-main text-center">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-extrabold text-foreground md:text-5xl">Medical Tourism <span className="gradient-text">Blog</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Insights, guides, and tips for your medical journey to India</p>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-main grid gap-8 md:grid-cols-2">
        {blogs.map(b => (
          <AnimatedSection key={b.slug}>
            <div className="card-medical group overflow-hidden p-0">
              <div className="relative h-52 overflow-hidden">
                <img src={b.img} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{b.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{b.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  </div>
);

export default BlogPage;
