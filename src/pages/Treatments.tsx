import { Link, useParams } from "react-router-dom";
import { Heart, Bone, Sparkles, Baby, Shield, HeartPulse, ArrowRight, Clock, DollarSign, Building2, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const treatmentData = [
  { slug: "cardiology", icon: Heart, title: "Cardiology", desc: "Comprehensive heart care including bypass surgery, valve replacement, angioplasty, and pacemaker implantation.", overview: "India is a global leader in cardiac care with experienced surgeons performing over 100,000 heart surgeries annually.", who: "Patients with coronary artery disease, heart valve disorders, arrhythmias, or congenital heart defects.", procedure: "Diagnosis through advanced imaging, followed by minimally invasive or open-heart surgical intervention under expert supervision.", recovery: "5-7 days hospital stay, 4-6 weeks total recovery with monitored rehabilitation.", cost: "$3,000 – $8,000", hospitals: ["Apollo Hospitals", "Fortis Escorts", "Medanta"], color: "text-destructive" },
  { slug: "orthopedics", icon: Bone, title: "Orthopedics", desc: "Joint replacements, spine surgery, sports medicine, and trauma care with cutting-edge robotic assistance.", overview: "Indian orthopedic surgeons are renowned for performing over 200,000 joint replacements annually with robotic precision.", who: "Patients with arthritis, joint degeneration, spinal disorders, sports injuries, or fractures.", procedure: "Pre-surgical assessment, robotic-assisted or traditional surgery, and structured physiotherapy.", recovery: "3-5 days hospital stay, 6-8 weeks total recovery with physiotherapy support.", cost: "$4,000 – $7,000", hospitals: ["Max Healthcare", "Fortis", "Apollo"], color: "text-secondary" },
  { slug: "cosmetic-surgery", icon: Sparkles, title: "Cosmetic Surgery", desc: "Rhinoplasty, facelifts, liposuction, hair transplants, and body contouring by top surgeons.", overview: "India offers world-class cosmetic procedures at a fraction of Western costs with board-certified surgeons.", who: "Individuals seeking aesthetic enhancements or reconstructive procedures.", procedure: "Detailed consultation, 3D simulation, surgery under general or local anesthesia.", recovery: "1-3 days hospital stay, 2-6 weeks recovery depending on procedure.", cost: "$1,500 – $5,000", hospitals: ["Kokilaben Hospital", "Apollo Cosmetic", "Fortis"], color: "text-primary" },
  { slug: "ivf-fertility", icon: Baby, title: "IVF & Fertility", desc: "IVF, IUI, ICSI, egg freezing, and comprehensive fertility treatments with high success rates.", overview: "India boasts IVF success rates of 50-60% with advanced reproductive technologies and experienced specialists.", who: "Couples facing infertility, recurrent pregnancy loss, or those seeking fertility preservation.", procedure: "Hormonal stimulation, egg retrieval, fertilization, embryo transfer with genetic screening options.", recovery: "Minimal downtime, 2-week wait period for results, ongoing monitoring.", cost: "$2,500 – $5,000", hospitals: ["Nova IVF", "Apollo Fertility", "Fortis Bloom"], color: "text-accent" },
  { slug: "oncology", icon: Shield, title: "Oncology", desc: "Comprehensive cancer treatment including surgery, chemotherapy, radiation therapy, and immunotherapy.", overview: "India's oncology centers feature the latest linear accelerators, proton therapy, and targeted treatment protocols.", who: "Patients diagnosed with any form of cancer seeking treatment or second opinions.", procedure: "Multi-disciplinary tumor board review, personalized treatment plan combining surgery, chemo, and radiation.", recovery: "Varies by cancer type and treatment, typically 2-12 weeks with ongoing follow-up.", cost: "$3,000 – $15,000", hospitals: ["Tata Memorial", "Rajiv Gandhi Cancer Institute", "HCG"], color: "text-secondary" },
  { slug: "organ-transplant", icon: HeartPulse, title: "Organ Transplant", desc: "Kidney, liver, heart, and bone marrow transplants with exceptional survival rates.", overview: "Indian transplant centers perform thousands of successful organ transplants annually with survival rates matching global standards.", who: "Patients with end-stage organ failure who require transplantation.", procedure: "Comprehensive evaluation, donor matching, transplant surgery, and immunosuppressive therapy.", recovery: "7-14 days hospital stay, 3-6 months total recovery with regular monitoring.", cost: "$12,000 – $35,000", hospitals: ["Medanta", "Apollo", "AIIMS"], color: "text-destructive" },
];

export const TreatmentsListPage = () => (
  <div className="font-body">
    <section className="hero-gradient-bg section-padding">
      <div className="container-main text-center">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-extrabold text-foreground md:text-5xl">Our <span className="gradient-text">Treatments</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">World-class medical procedures at India's top accredited hospitals</p>
        </AnimatedSection>
      </div>
    </section>
    <section className="section-padding">
      <div className="container-main grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treatmentData.map(t => (
          <AnimatedSection key={t.slug}>
            <Link to={`/treatments/${t.slug}`} className="card-medical group flex flex-col h-full">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                <t.icon className={`h-7 w-7 ${t.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{t.cost}</span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">View Details <ChevronRight className="h-4 w-4" /></span>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  </div>
);

export const TreatmentDetailPage = () => {
  const { slug } = useParams();
  const treatment = treatmentData.find(t => t.slug === slug);
  if (!treatment) return <div className="section-padding container-main text-center"><h1 className="font-display text-2xl">Treatment not found</h1><Link to="/treatments" className="btn-primary-medical mt-4 inline-flex">Back to Treatments</Link></div>;

  return (
    <div className="font-body">
      <section className="hero-gradient-bg section-padding">
        <div className="container-main">
          <AnimatedSection>
            <Link to="/treatments" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ChevronRight className="h-4 w-4 rotate-180" /> All Treatments</Link>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <treatment.icon className={`h-8 w-8 ${treatment.color}`} />
              </div>
              <div>
                <h1 className="font-display text-4xl font-extrabold text-foreground">{treatment.title}</h1>
                <p className="mt-1 text-muted-foreground">{treatment.desc}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {[
              { title: "Overview", content: treatment.overview },
              { title: "Who Needs This Treatment?", content: treatment.who },
              { title: "Treatment Procedure", content: treatment.procedure },
              { title: "Recovery Timeline", content: treatment.recovery },
            ].map(s => (
              <AnimatedSection key={s.title} className="card-medical">
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.content}</p>
              </AnimatedSection>
            ))}
          </div>
          <div className="space-y-6">
            <div className="card-medical">
              <h3 className="font-display text-lg font-semibold text-foreground">Estimated Cost</h3>
              <p className="mt-2 text-2xl font-bold text-primary">{treatment.cost}</p>
              <p className="mt-1 text-xs text-muted-foreground">Save up to 80% compared to US costs</p>
            </div>
            <div className="card-medical">
              <h3 className="font-display text-lg font-semibold text-foreground">Partner Hospitals</h3>
              <ul className="mt-3 space-y-2">
                {treatment.hospitals.map(h => (
                  <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 text-primary" /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/contact" className="btn-primary-medical w-full text-center">
              Enquire for Treatment <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
