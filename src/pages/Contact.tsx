import { useState, useRef } from "react";
import { MapPin, Mail, Phone, Upload, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_DETAILS, submitContactRequest } from "@/lib/contact";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "", treatment: "", message: "" });
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await submitContactRequest({
        source: "contact_page",
        ...formData,
        fileName: fileName || undefined,
        createdAt: new Date().toISOString(),
      });

      setFormData({ name: "", email: "", phone: "", country: "", treatment: "", message: "" });
      setFileName("");
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      toast({
        title: "Request sent",
        description: "Thanks for reaching out. Our team will contact you within 24 hours.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-body">
      <section className="hero-gradient-bg section-padding">
        <div className="container-main text-center">
          <AnimatedSection>
            <h1 className="font-display text-4xl font-extrabold text-foreground md:text-5xl">Contact <span className="gradient-text">Us</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Get in touch with our medical tourism experts for a free consultation</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection animation="slide-in-left">
              <h2 className="font-display text-2xl font-bold text-foreground">Get In Touch</h2>
              <p className="mt-2 text-muted-foreground">We're here to help you plan your medical journey to India.</p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
                  <div><h4 className="font-display font-semibold text-foreground">Office Address</h4><p className="text-sm text-muted-foreground">{CONTACT_DETAILS.address}</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"><Mail className="h-5 w-5 text-primary" /></div>
                  <div><h4 className="font-display font-semibold text-foreground">Email</h4><p className="text-sm text-muted-foreground">{CONTACT_DETAILS.email}</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"><Phone className="h-5 w-5 text-primary" /></div>
                  <div><h4 className="font-display font-semibold text-foreground">Phone / WhatsApp</h4><p className="text-sm text-muted-foreground">{CONTACT_DETAILS.phone}</p></div>
                </div>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection className="mt-8 overflow-hidden rounded-xl">
              <iframe
                src={CONTACT_DETAILS.mapEmbedUrl}
                width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location"
                className="rounded-xl"
              />
            </AnimatedSection>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatedSection animation="slide-in-right">
              <form onSubmit={handleSubmit} className="card-medical space-y-4">
                <h2 className="font-display text-2xl font-bold text-foreground">Medical Inquiry Form</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="text" placeholder="Full Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  <input type="email" placeholder="Email Address *" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  <input type="text" placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <select value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option value="">Treatment Needed</option>
                  {["Cardiology","Orthopedics","Cosmetic Surgery","IVF & Fertility","Oncology","Organ Transplant","Dental","Other"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div>
                  <input type="file" ref={fileRef} onChange={handleFile} className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="flex w-full items-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition-all hover:border-primary">
                    <Upload className="h-4 w-4" /> {fileName || "Upload Medical Report (PDF, JPG, DOC)"}
                  </button>
                </div>
                <textarea placeholder="Tell us about your medical needs..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <button type="submit" className="btn-primary-medical w-full text-base" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"} <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
