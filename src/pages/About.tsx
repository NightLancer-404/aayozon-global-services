import { Link } from "react-router-dom";
import { Shield, Users, Award, Globe, Heart, Building2, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import hospitalImg from "@/assets/hospital-modern.jpg";

const values = [
  { icon: Shield, title: "Accredited Hospitals", desc: "We partner only with JCI and NABH accredited hospitals ensuring the highest standards of care." },
  { icon: Users, title: "Expert Medical Team", desc: "Our network includes surgeons and specialists trained at the world's leading medical institutions." },
  { icon: Globe, title: "International Care Team", desc: "Multilingual coordinators ensure smooth communication throughout your medical journey." },
  { icon: Award, title: "Proven Track Record", desc: "Over 5,000 international patients successfully treated with a 98% satisfaction rate." },
  { icon: Heart, title: "Patient-First Approach", desc: "From the first consultation to post-treatment follow-ups, your well-being is our priority." },
  { icon: Building2, title: "End-to-End Support", desc: "Visa assistance, airport transfers, accommodation, and sightseeing — all handled by us." },
];

const AboutPage = () => (
  <div className="font-body">
    {/* Hero */}
    <section className="hero-gradient-bg section-padding">
      <div className="container-main text-center">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-extrabold text-foreground md:text-5xl">About <span className="gradient-text">Aayozon</span></h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Aayozon Global Services Pvt. Ltd. is India's premier medical tourism facilitator, bridging the gap between world-class healthcare and international patients seeking affordable, high-quality treatment.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Mission */}
    <section className="section-padding">
      <div className="container-main grid items-center gap-12 lg:grid-cols-2">
        <AnimatedSection animation="slide-in-left">
          <img src={hospitalImg} alt="Modern hospital facility" className="rounded-2xl shadow-lg" />
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right">
          <h2 className="font-display text-3xl font-bold text-foreground">Our <span className="gradient-text">Mission</span></h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            To make world-class medical care accessible to every patient globally by connecting them with India's finest hospitals, experienced doctors, and comprehensive travel support — all at a fraction of the cost they'd pay in their home countries.
          </p>
          <h2 className="mt-8 font-display text-3xl font-bold text-foreground">Our <span className="gradient-text">Vision</span></h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            To position India as the world's most trusted destination for medical tourism by delivering exceptional patient experiences that combine clinical excellence with cultural richness.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Why choose us */}
    <section className="section-alt section-padding">
      <div className="container-main">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Why Choose <span className="gradient-text">Us</span></h2>
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(v => (
            <AnimatedSection key={v.title} className="card-medical">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container-main text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold text-foreground">Ready to Start Your <span className="gradient-text">Medical Journey</span>?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Get a free consultation with our medical experts and begin planning your treatment in India.</p>
          <Link to="/contact" className="btn-primary-medical mt-8 inline-flex text-base">
            Get Free Consultation <ArrowRight className="h-5 w-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default AboutPage;
