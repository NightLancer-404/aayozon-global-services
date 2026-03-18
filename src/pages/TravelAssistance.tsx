import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, FileText, Car, MapPin, Shield, Languages, ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import airplane from "@/assets/airplane.png";
import locationPin from "@/assets/location-pin.png";
import stethoscope from "@/assets/stethoscope.png";
import delhiImg from "@/assets/delhi-city.jpg";
import mumbaiImg from "@/assets/mumbai-city.jpg";
import chennaiImg from "@/assets/chennai-city.jpg";
import bangaloreImg from "@/assets/bangalore-city.jpg";
import keralaImg from "@/assets/kerala-backwaters.jpg";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitTravelAssistanceRequest } from "@/lib/contact";

const services = [
  { icon: FileText, title: "Visa Assistance", desc: "Complete guidance for medical visa applications, documentation support, and fast-track processing for urgent cases." },
  { icon: Plane, title: "Flight Booking Support", desc: "Best fare assistance, medical-friendly airlines, and wheelchair or stretcher booking coordination." },
  { icon: Car, title: "Airport Pickup & Drop", desc: "Air-conditioned vehicle with a coordinator waiting at the airport for a seamless arrival experience." },
  { icon: MapPin, title: "Local Transportation", desc: "Dedicated vehicle and driver for hospital visits, sightseeing, and all local travel needs." },
  { icon: Shield, title: "Travel Insurance Guidance", desc: "Recommendations for comprehensive travel and medical insurance tailored for medical tourists." },
  { icon: Languages, title: "Language & Translator Support", desc: "Multilingual coordinators and professional interpreters available in Arabic, Russian, French, and more." },
];

const steps = [
  { num: "01", title: "Share Your Travel Dates", desc: "Tell us your preferred travel window and treatment schedule." },
  { num: "02", title: "Visa & Documentation", desc: "We assist with medical visa invitation letters and document preparation." },
  { num: "03", title: "Book Flights & Accommodation", desc: "We help arrange flights and patient-friendly hotel stays near your hospital." },
  { num: "04", title: "Arrival & Pickup", desc: "Our team greets you at the airport and transfers you to your accommodation." },
  { num: "05", title: "Ongoing Coordination", desc: "Dedicated coordinator throughout your stay for transport, translation, and support." },
];

const destinations = [
  { name: "Delhi", desc: "India's capital with world-class hospitals like AIIMS, Max, and Medanta.", img: delhiImg, hospitals: "15+ Hospitals" },
  { name: "Mumbai", desc: "Financial hub with premier centers like Kokilaben, Lilavati, and Hinduja.", img: mumbaiImg, hospitals: "12+ Hospitals" },
  { name: "Chennai", desc: "Healthcare capital of India with Apollo, MIOT, and Fortis Malar.", img: chennaiImg, hospitals: "10+ Hospitals" },
  { name: "Bangalore", desc: "IT city with Manipal, Narayana Health, and Aster CMI hospitals.", img: bangaloreImg, hospitals: "10+ Hospitals" },
  { name: "Kerala", desc: "Ayurvedic wellness destination with excellent multi-specialty hospitals.", img: keralaImg, hospitals: "8+ Hospitals" },
];

const TravelAssistancePage = () => {
  const { scrollY } = useScroll();
  const airplaneY = useTransform(scrollY, [0, 500], [0, -60]);
  const airplaneX = useTransform(scrollY, [0, 500], [0, 40]);
  const pinY = useTransform(scrollY, [0, 500], [0, -30]);
  const stethY = useTransform(scrollY, [0, 500], [0, -40]);
  const [formData, setFormData] = useState({ name: "", country: "", travelDates: "", city: "", budget: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await submitTravelAssistanceRequest({
        source: "travel_assistance",
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setFormData({ name: "", country: "", travelDates: "", city: "", budget: "" });
      toast({
        title: "Request sent",
        description: "Our travel team will contact you within 24 hours.",
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
            <AnimatedSection>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
                Seamless Travel Support for Your <span className="gradient-text">Medical Journey</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                From visa assistance to airport pickup, we handle every aspect of your travel so you can focus entirely on your health and recovery.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#travel-inquiry" className="btn-primary-medical text-base">
                  Plan Your Travel <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/contact" className="btn-secondary-medical text-base">Contact Us</Link>
              </div>
            </AnimatedSection>
            <div className="relative flex min-h-[350px] items-center justify-center">
              <motion.img src={airplane} alt="" className="absolute right-8 top-4 h-24 w-24 opacity-70 lg:h-32 lg:w-32" style={{ y: airplaneY, x: airplaneX }} />
              <motion.img src={locationPin} alt="" className="absolute bottom-8 left-8 h-14 w-14 opacity-50" style={{ y: pinY }} />
              <motion.img src={stethoscope} alt="" className="absolute left-16 top-8 h-16 w-16 opacity-40" style={{ y: stethY }} />
              <div className="relative z-10 rounded-2xl bg-card/80 p-8 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Plane className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-foreground">5000+</p>
                    <p className="text-sm text-muted-foreground">Patients Assisted</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <MapPin className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-foreground">40+</p>
                    <p className="text-sm text-muted-foreground">Countries Served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Travel <span className="gradient-text">Services</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">End-to-end travel support tailored for international medical tourists</p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(s => (
              <AnimatedSection key={s.title} className="card-medical flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">How It <span className="gradient-text">Works</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">A simple 5-step process to make your medical travel hassle-free</p>
          </AnimatedSection>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block" />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <AnimatedSection key={step.num} animation={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                  <div className={`flex items-start gap-6 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                      <div className="card-medical">
                        <span className="font-display text-3xl font-extrabold text-primary/20">{step.num}</span>
                        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:flex">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="hidden flex-1 md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Top Medical <span className="gradient-text">Destinations</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">India's leading cities for world-class medical treatment</p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map(d => (
              <AnimatedSection key={d.name}>
                <div className="card-medical group overflow-hidden p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img src={d.img} alt={d.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">{d.hospitals}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{d.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INQUIRY FORM ===== */}
      <section id="travel-inquiry" className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
              Start Planning Your <span className="gradient-text">Medical Travel</span>
            </h2>
            <p className="mb-8 text-center text-muted-foreground">Share your details and our travel team will assist you within 24 hours</p>
            <form onSubmit={handleSubmit} className="card-medical space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <input type="text" placeholder="Country" required value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Preferred Travel Dates" value={formData.travelDates} onChange={e => setFormData({ ...formData, travelDates: e.target.value })}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <select value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option value="">Preferred City</option>
                  {destinations.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <select value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option value="">Budget Range</option>
                <option value="economy">Economy (Under $2,000)</option>
                <option value="moderate">Moderate ($2,000 - $5,000)</option>
                <option value="premium">Premium ($5,000 - $10,000)</option>
                <option value="luxury">Luxury ($10,000+)</option>
              </select>
              <button type="submit" className="btn-primary-medical w-full text-base" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get Travel Assistance"} <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default TravelAssistancePage;
