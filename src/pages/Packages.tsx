import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, MapPin, Clock, Heart, Check, X } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import keralaImg from "@/assets/kerala-backwaters.jpg";
import goaImg from "@/assets/goa-beach.jpg";
import rajasthanImg from "@/assets/rajasthan-palace.jpg";
import hospitalImg from "@/assets/hospital-modern.jpg";

const packageData = [
  {
    slug: "heart-surgery-kerala", img: keralaImg, title: "Heart Surgery + Kerala Recovery Tour", treatment: "Cardiology", dest: "Kerala", duration: "14 days",
    price: "From $6,500", overview: "Combine world-class cardiac surgery at top hospitals with a serene recovery journey through Kerala's backwaters and Ayurvedic wellness centers.",
    treatmentIncluded: "Coronary bypass or valve replacement surgery at Apollo/Fortis hospitals with pre and post-operative care.",
    tourism: ["Kerala backwater houseboat cruise", "Ayurvedic wellness spa sessions", "Munnar tea plantation visit", "Cochin heritage city tour"],
    hospitalStay: "5-7 days", hotelStay: "7 days at 4-star wellness resort", meals: "All meals included during hospital and hotel stay",
    inclusions: ["Airport transfers", "Visa assistance", "24/7 medical coordinator", "All hospital charges", "Post-op medications", "Wellness spa sessions", "Sightseeing tours"],
    exclusions: ["International flights", "Travel insurance", "Personal shopping", "Extra excursions"],
  },
  {
    slug: "knee-replacement-goa", img: goaImg, title: "Knee Replacement + Goa Wellness Stay", treatment: "Orthopedics", dest: "Goa", duration: "21 days",
    price: "From $5,200", overview: "Get a robotic-assisted knee replacement followed by beachside physiotherapy and wellness recovery in Goa.",
    treatmentIncluded: "Total or partial knee replacement with robotic assistance at Max/Fortis hospitals.",
    tourism: ["Beach physiotherapy sessions", "Goa heritage walking tour", "Spice plantation visit", "Yoga and meditation retreat"],
    hospitalStay: "4-5 days", hotelStay: "16 days at beachfront wellness resort", meals: "Breakfast and dinner included",
    inclusions: ["Airport transfers", "Visa assistance", "Physiotherapy sessions", "All hospital charges", "Wellness activities", "Local transport"],
    exclusions: ["International flights", "Travel insurance", "Lunch during hotel stay"],
  },
  {
    slug: "ivf-rajasthan", img: rajasthanImg, title: "IVF Treatment + Rajasthan Cultural Tour", treatment: "IVF & Fertility", dest: "Rajasthan", duration: "18 days",
    price: "From $4,800", overview: "Experience India's top IVF clinics with a magical cultural journey through Rajasthan's royal heritage.",
    treatmentIncluded: "Complete IVF cycle including hormonal stimulation, egg retrieval, fertilization, and embryo transfer.",
    tourism: ["Jaipur Pink City tour", "Udaipur lake palace visit", "Jodhpur blue city exploration", "Desert safari experience"],
    hospitalStay: "3-5 days (clinic visits)", hotelStay: "15 days at heritage hotels", meals: "Breakfast included, curated dinner experiences",
    inclusions: ["Airport transfers", "Visa assistance", "All clinic charges", "Medications", "Heritage hotel stays", "Guided cultural tours"],
    exclusions: ["International flights", "Travel insurance", "Personal shopping", "Additional medical tests"],
  },
  {
    slug: "dental-agra", img: hospitalImg, title: "Dental Makeover + Agra Heritage Tour", treatment: "Dental", dest: "Agra & Delhi", duration: "10 days",
    price: "From $2,200", overview: "Transform your smile with advanced dental procedures and visit the iconic Taj Mahal and Delhi's historical monuments.",
    treatmentIncluded: "Comprehensive dental makeover including veneers, implants, or full mouth rehabilitation.",
    tourism: ["Taj Mahal sunrise visit", "Agra Fort tour", "Old Delhi food walk", "Chandni Chowk shopping"],
    hospitalStay: "2-3 days (clinic visits)", hotelStay: "8 days at premium hotels", meals: "Breakfast included",
    inclusions: ["Airport transfers", "All dental procedures", "Hotel stays", "Guided tours", "Local transport"],
    exclusions: ["International flights", "Travel insurance", "Lunch and dinner"],
  },
];

export const PackagesListPage = () => (
  <div className="font-body">
    <section className="hero-gradient-bg section-padding">
      <div className="container-main text-center">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-extrabold text-foreground md:text-5xl">Medical + Tourism <span className="gradient-text">Packages</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Combine world-class treatment with unforgettable Indian experiences</p>
        </AnimatedSection>
      </div>
    </section>
    <section className="section-padding">
      <div className="container-main grid gap-8 md:grid-cols-2">
        {packageData.map(p => (
          <AnimatedSection key={p.slug}>
            <Link to={`/packages/${p.slug}`} className="card-medical group overflow-hidden p-0">
              <div className="relative h-56 overflow-hidden">
                <img src={p.img} alt={p.dest} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">{p.price}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.overview}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="trust-badge text-xs"><Heart className="h-3 w-3" />{p.treatment}</span>
                  <span className="trust-badge text-xs"><MapPin className="h-3 w-3" />{p.dest}</span>
                  <span className="trust-badge text-xs"><Clock className="h-3 w-3" />{p.duration}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">View Package <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  </div>
);

export const PackageDetailPage = () => {
  const { slug } = useParams();
  const pkg = packageData.find(p => p.slug === slug);
  if (!pkg) return <div className="section-padding container-main text-center"><h1 className="font-display text-2xl">Package not found</h1><Link to="/packages" className="btn-primary-medical mt-4 inline-flex">Back to Packages</Link></div>;

  return (
    <div className="font-body">
      <section className="relative">
        <img src={pkg.img} alt={pkg.dest} className="h-72 w-full object-cover md:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-main">
            <Link to="/packages" className="mb-2 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground"><ChevronRight className="h-4 w-4 rotate-180" /> All Packages</Link>
            <h1 className="font-display text-3xl font-extrabold text-primary-foreground md:text-4xl">{pkg.title}</h1>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm">{pkg.treatment}</span>
              <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm">{pkg.dest}</span>
              <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm">{pkg.duration}</span>
              <span className="rounded-full bg-accent/80 px-3 py-1 text-sm font-semibold text-accent-foreground">{pkg.price}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection className="card-medical"><h3 className="font-display text-lg font-semibold text-foreground">Package Overview</h3><p className="mt-2 text-muted-foreground">{pkg.overview}</p></AnimatedSection>
            <AnimatedSection className="card-medical"><h3 className="font-display text-lg font-semibold text-foreground">Treatment Included</h3><p className="mt-2 text-muted-foreground">{pkg.treatmentIncluded}</p></AnimatedSection>
            <AnimatedSection className="card-medical">
              <h3 className="font-display text-lg font-semibold text-foreground">Tourism Activities</h3>
              <ul className="mt-3 space-y-2">{pkg.tourism.map(a => <li key={a} className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 shrink-0 text-primary" />{a}</li>)}</ul>
            </AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-2">
              <AnimatedSection className="card-medical"><h4 className="font-display font-semibold text-foreground">Inclusions</h4><ul className="mt-3 space-y-2">{pkg.inclusions.map(i => <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 shrink-0 text-accent" />{i}</li>)}</ul></AnimatedSection>
              <AnimatedSection className="card-medical"><h4 className="font-display font-semibold text-foreground">Exclusions</h4><ul className="mt-3 space-y-2">{pkg.exclusions.map(i => <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><X className="h-4 w-4 shrink-0 text-destructive" />{i}</li>)}</ul></AnimatedSection>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card-medical"><h4 className="font-display font-semibold text-foreground">Duration</h4><p className="mt-1 text-2xl font-bold text-primary">{pkg.duration}</p></div>
            <div className="card-medical"><h4 className="font-display font-semibold text-foreground">Hospital Stay</h4><p className="mt-1 text-muted-foreground">{pkg.hospitalStay}</p></div>
            <div className="card-medical"><h4 className="font-display font-semibold text-foreground">Hotel Stay</h4><p className="mt-1 text-muted-foreground">{pkg.hotelStay}</p></div>
            <div className="card-medical"><h4 className="font-display font-semibold text-foreground">Meals</h4><p className="mt-1 text-muted-foreground">{pkg.meals}</p></div>
            <Link to="/contact" className="btn-primary-medical w-full text-center">Enquire for Package <ArrowRight className="h-5 w-5" /></Link>
            <Link to="/contact" className="btn-secondary-medical w-full text-center">Customize Package</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
