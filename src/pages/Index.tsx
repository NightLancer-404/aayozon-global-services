import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Bone, Sparkles, Baby, Shield, Stethoscope, Plane, Hotel, ClipboardList, HeartPulse, Building2, Star, ChevronRight, ArrowRight, FileText, Car, MapPin } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import doctorHero from "@/assets/doctor-hero.png";
import airplane from "@/assets/airplane.png";
import locationPin from "@/assets/location-pin.png";
import stethoscope from "@/assets/stethoscope.png";
import keralaImg from "@/assets/kerala-backwaters.jpg";
import goaImg from "@/assets/goa-beach.jpg";
import rajasthanImg from "@/assets/rajasthan-palace.jpg";
import hospitalImg from "@/assets/hospital-modern.jpg";
import hotelLuxury from "@/assets/hotel-luxury.jpg";
import hotelBudget from "@/assets/hotel-budget.jpg";
import hotelApartment from "@/assets/hotel-apartment.jpg";
import hotelGuesthouse from "@/assets/hotel-guesthouse.jpg";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitContactRequest } from "@/lib/contact";

const travelServices = [
  { icon: FileText, title: "Visa Support", desc: "Complete visa documentation and application assistance" },
  { icon: Plane, title: "Flight Booking", desc: "Best deals on international and domestic flights" },
  { icon: Car, title: "Airport Pickup", desc: "Comfortable airport transfers to your destination" },
  { icon: MapPin, title: "Local Transport", desc: "Dedicated vehicles for hospital visits and sightseeing" },
];

const hotelPreviews = [
  { img: hotelLuxury, name: "Luxury Hotels", desc: "5-star comfort with premium amenities and concierge service", distance: "0.5 km from hospital" },
  { img: hotelBudget, name: "Budget Hotels", desc: "Clean, comfortable stays at affordable rates", distance: "1 km from hospital" },
  { img: hotelApartment, name: "Service Apartments", desc: "Home-like stays with kitchen and living space for families", distance: "1.5 km from hospital" },
  { img: hotelGuesthouse, name: "Hospital Guest Houses", desc: "On-campus accommodation for immediate medical access", distance: "Within hospital campus" },
];

const services = [
  { icon: Stethoscope, title: "Medical Consultation", desc: "Expert medical opinions from top specialists across India" },
  { icon: ClipboardList, title: "Treatment Planning", desc: "Personalized treatment roadmaps tailored to your needs" },
  { icon: Building2, title: "Hospital Coordination", desc: "Seamless coordination with JCI/NABH accredited hospitals" },
  { icon: Plane, title: "Travel Assistance", desc: "Visa support, airport transfers, and travel arrangements", link: "/travel-assistance" },
  { icon: Hotel, title: "Accommodation", desc: "Comfortable stays near hospitals with patient amenities", link: "/hotels" },
  { icon: HeartPulse, title: "Post Treatment Care", desc: "Follow-up consultations and recovery monitoring" },
];

const treatments = [
  { icon: Heart, title: "Cardiology", desc: "Heart surgery, bypass, valve replacement", color: "text-destructive" },
  { icon: Bone, title: "Orthopedics", desc: "Joint replacement, spine surgery", color: "text-secondary" },
  { icon: Sparkles, title: "Cosmetic Surgery", desc: "Rhinoplasty, facelifts, body contouring", color: "text-primary" },
  { icon: Baby, title: "IVF & Fertility", desc: "IVF, IUI, surrogacy support", color: "text-accent" },
  { icon: Shield, title: "Oncology", desc: "Cancer treatment, chemotherapy, radiation", color: "text-secondary" },
  { icon: HeartPulse, title: "Organ Transplant", desc: "Kidney, liver, heart transplants", color: "text-destructive" },
];

const packages = [
  { img: keralaImg, title: "Heart Surgery + Kerala Recovery Tour", treatment: "Cardiology", dest: "Kerala", duration: "14 days", price: "From $6,500" },
  { img: goaImg, title: "Knee Replacement + Goa Wellness Stay", treatment: "Orthopedics", dest: "Goa", duration: "21 days", price: "From $5,200" },
  { img: rajasthanImg, title: "IVF Treatment + Rajasthan Cultural Tour", treatment: "IVF & Fertility", dest: "Rajasthan", duration: "18 days", price: "From $4,800" },
];

const testimonials = [
  { name: "James Wilson", country: "United Kingdom", text: "The entire experience was seamless. From airport pickup to my knee surgery and recovery in Goa, everything was world-class.", rating: 5 },
  { name: "Sarah Ahmed", country: "United Arab Emirates", text: "I came for cardiac surgery and was amazed by the quality of care. The doctors were exceptional and the cost was a fraction of what I'd pay back home.", rating: 5 },
  { name: "Michael Brown", country: "United States", text: "Aayozon made medical tourism stress-free. Their coordination with the hospital and my travel was impeccable.", rating: 5 },
];

const hospitals = ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Medanta", "AIIMS", "Narayana Health", "Manipal Hospitals", "Kokilaben Hospital"];

const HomePage = () => {
  const { scrollY } = useScroll();
  const airplaneY = useTransform(scrollY, [0, 500], [0, -60]);
  const airplaneX = useTransform(scrollY, [0, 500], [0, 40]);
  const pinY = useTransform(scrollY, [0, 500], [0, -30]);
  const stethY = useTransform(scrollY, [0, 500], [0, -40]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", country: "", treatment: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await submitContactRequest({
        source: "home_consultation",
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setFormData({ name: "", email: "", country: "", treatment: "", message: "" });
      toast({
        title: "Request sent",
        description: "Thanks! Our team will contact you within 24 hours.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-body">
      {/* ===== HERO ===== */}
      <section className="hero-gradient-bg relative overflow-hidden">
        <div className="container-main section-padding">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative z-10">
              <div className="trust-badge mb-6 inline-flex">
                <Shield className="h-4 w-4" /> JCI & NABH Accredited Partners
              </div>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
                World-Class Medical Treatment with the{" "}
                <span className="gradient-text">Beauty of India</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Save up to 80% on medical procedures at internationally accredited hospitals while experiencing India's rich culture and hospitality.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary-medical text-base">
                  Get Medical Consultation <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/treatments" className="btn-secondary-medical text-base">
                  Explore Treatments
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-accent" /> 5000+ Patients</span>
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4 text-secondary" /> 50+ Hospitals</span>
                <span className="flex items-center gap-1"><Heart className="h-4 w-4 text-destructive" /> 98% Success</span>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative">
                <img src={doctorHero} alt="Medical professional" className="relative z-10 h-auto max-h-[500px] w-auto drop-shadow-2xl" />
                <div className="absolute -bottom-4 -right-4 -z-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -left-4 -top-4 -z-0 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
              </div>
              <motion.img src={airplane} alt="" className="absolute -right-4 top-8 h-20 w-20 opacity-60 lg:h-28 lg:w-28" style={{ y: airplaneY, x: airplaneX }} />
              <motion.img src={locationPin} alt="" className="absolute bottom-12 left-0 h-12 w-12 opacity-50" style={{ y: pinY }} />
              <motion.img src={stethoscope} alt="" className="absolute -left-8 top-16 h-16 w-16 opacity-40" style={{ y: stethY }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Our <span className="gradient-text">Services</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Comprehensive medical tourism support from consultation to recovery</p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} className={`card-medical flex flex-col items-start gap-4`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {"link" in s && s.link && (
                  <Link to={s.link} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TREATMENTS ===== */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Popular <span className="gradient-text">Treatments</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">India is a global leader in these medical specialties</p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map(t => (
              <AnimatedSection key={t.title}>
                <Link to="/treatments" className="card-medical group flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <t.icon className={`h-7 w-7 ${t.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PACKAGES ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Medical + Tourism <span className="gradient-text">Packages</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Combine world-class treatment with unforgettable Indian experiences</p>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map(p => (
              <AnimatedSection key={p.title}>
                <Link to="/packages" className="card-medical group overflow-hidden p-0">
                  <div className="relative h-52 overflow-hidden">
                    <img src={p.img} alt={p.dest} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">{p.price}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="trust-badge text-xs">{p.treatment}</span>
                      <span className="trust-badge text-xs">{p.dest}</span>
                      <span className="trust-badge text-xs">{p.duration}</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View Package <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/packages" className="btn-secondary-medical">View All Packages</Link>
          </div>
        </div>
      </section>

      {/* ===== TRAVEL ASSISTANCE PREVIEW ===== */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Travel Assistance <span className="gradient-text">Made Simple</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">From visa to arrival, we take care of your entire journey.</p>
          </AnimatedSection>
          <div className="relative">
            <motion.img src={airplane} alt="" className="absolute -right-2 -top-8 h-16 w-16 opacity-40 lg:h-24 lg:w-24" style={{ y: useTransform(scrollY, [800, 1600], [0, -30]) }} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {travelServices.map(s => (
                <AnimatedSection key={s.title} className="card-medical flex flex-col items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                    <s.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/travel-assistance" className="btn-primary-medical">Explore Travel Assistance <ArrowRight className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>

      {/* ===== HOTELS & STAY PREVIEW ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Comfortable Stay for a <span className="gradient-text">Smooth Recovery</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Carefully selected stays near top hospitals.</p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hotelPreviews.map(h => (
              <AnimatedSection key={h.name}>
                <Link to="/hotels" className="card-medical group overflow-hidden p-0">
                  <div className="relative h-44 overflow-hidden">
                    <img src={h.img} alt={h.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-semibold text-foreground">{h.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{h.desc}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
                      <MapPin className="h-3 w-3" /> {h.distance}
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/hotels" className="btn-secondary-medical">View All Stays <ArrowRight className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>


      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Partner <span className="gradient-text">Hospitals</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We work with India's top JCI & NABH accredited hospitals</p>
          </AnimatedSection>
          <div className="relative overflow-hidden">
            <div className="flex animate-[scroll_20s_linear_infinite] gap-8">
              {[...hospitals, ...hospitals].map((h, i) => (
                <div key={i} className="flex h-20 min-w-[200px] items-center justify-center rounded-xl border border-border bg-card px-6">
                  <span className="font-display text-sm font-semibold text-muted-foreground">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY INDIA ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection animation="slide-in-left">
              <img src={hospitalImg} alt="Modern hospital in India" className="rounded-2xl shadow-lg" />
            </AnimatedSection>
            <AnimatedSection animation="slide-in-right">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Why Choose <span className="gradient-text">India</span>?</h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Save 60-80% compared to US, UK, and European healthcare costs",
                  "JCI & NABH accredited hospitals with latest technology",
                  "English-speaking doctors trained at world's top institutions",
                  "Zero waiting time for most procedures",
                  "Combine treatment with cultural exploration",
                  "Dedicated international patient care coordinators",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent"><svg className="h-3 w-3 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Patient <span className="gradient-text">Testimonials</span></h2>
          </AnimatedSection>
          <div className="mx-auto max-w-2xl">
            <div className="card-medical text-center">
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg italic text-muted-foreground">"{testimonials[activeTestimonial].text}"</p>
              <p className="mt-4 font-display font-semibold text-foreground">{testimonials[activeTestimonial].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].country}</p>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`h-3 w-3 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-primary" : "bg-border hover:bg-muted-foreground"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INQUIRY FORM ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <AnimatedSection className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">Get a <span className="gradient-text">Free Consultation</span></h2>
            <p className="mb-8 text-center text-muted-foreground">Fill in your details and our medical team will get back to you within 24 hours</p>
            <form onSubmit={handleSubmit} className="card-medical space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <select value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option value="">Select Treatment</option>
                  {treatments.map(t => <option key={t.title} value={t.title}>{t.title}</option>)}
                </select>
              </div>
              <textarea placeholder="Tell us about your medical needs..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <button type="submit" className="btn-primary-medical w-full text-base" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Inquiry"} <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
