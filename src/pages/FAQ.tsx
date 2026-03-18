import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const faqCategories = [
  {
    category: "Medical Treatments",
    faqs: [
      { q: "What types of medical treatments are available in India?", a: "India offers a wide range of treatments including cardiology, orthopedics, oncology, organ transplants, cosmetic surgery, IVF, dental care, eye surgery, and more at internationally accredited hospitals." },
      { q: "Are the doctors in India qualified?", a: "Yes! Indian doctors are trained at the world's top medical institutions. Many have practiced in the US, UK, and Europe before returning to India. Our partner hospitals employ only board-certified specialists." },
      { q: "What is the success rate of surgeries in India?", a: "Success rates at top Indian hospitals are comparable to the best hospitals globally. For example, cardiac surgery success rates exceed 98%, and joint replacement success rates are above 95%." },
    ],
  },
  {
    category: "Travel Process",
    faqs: [
      { q: "How do I start my medical tourism journey?", a: "Simply fill out our inquiry form or contact us via WhatsApp. Our team will review your medical reports, recommend the best treatment options, and create a personalized plan for your visit." },
      { q: "Do you help with airport transfers?", a: "Yes, we provide complete airport pickup and drop-off services. A dedicated coordinator will be waiting for you at the airport upon arrival." },
      { q: "Can my family accompany me?", a: "Absolutely! We encourage patients to bring a companion. We arrange accommodation for accompanying family members and can plan sightseeing activities for them during your treatment." },
    ],
  },
  {
    category: "Visa & Documentation",
    faqs: [
      { q: "What type of visa do I need?", a: "Most medical tourists need a Medical Visa (MV), which allows multiple entries for up to one year. We provide all necessary documentation including invitation letters from the hospital." },
      { q: "Do you assist with visa processing?", a: "Yes, we provide complete visa assistance including documentation preparation, appointment scheduling, and guidance through the entire visa application process." },
    ],
  },
  {
    category: "Recovery & Stay",
    faqs: [
      { q: "What kind of accommodation do you provide?", a: "We offer a range of accommodations from budget-friendly guest houses to premium 5-star hotels near the hospital. All accommodations are vetted for cleanliness, accessibility, and comfort." },
      { q: "Is post-treatment follow-up available?", a: "Yes, we provide comprehensive post-treatment follow-up including virtual consultations with your treating doctor, medication management, and physiotherapy support." },
      { q: "Can I combine my treatment with tourism?", a: "Absolutely! Our Medical + Tourism packages are designed specifically for this. Depending on your recovery timeline, we can plan cultural tours, wellness retreats, and sightseeing activities." },
    ],
  },
];

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="font-body">
      <section className="hero-gradient-bg section-padding">
        <div className="container-main text-center">
          <AnimatedSection>
            <h1 className="font-display text-4xl font-extrabold text-foreground md:text-5xl">Frequently Asked <span className="gradient-text">Questions</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Everything you need to know about medical tourism in India</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main mx-auto max-w-3xl space-y-10">
          {faqCategories.map(cat => (
            <AnimatedSection key={cat.category}>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{cat.category}</h2>
              <div className="space-y-3">
                {cat.faqs.map((faq, i) => {
                  const key = `${cat.category}-${i}`;
                  return (
                    <div key={key} className="card-medical cursor-pointer p-0" onClick={() => toggle(key)}>
                      <div className="flex items-center justify-between p-5">
                        <h3 className="pr-4 font-display text-sm font-semibold text-foreground md:text-base">{faq.q}</h3>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${openItems[key] ? "rotate-180" : ""}`} />
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${openItems[key] ? "max-h-96 pb-5" : "max-h-0"}`}>
                        <p className="px-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
