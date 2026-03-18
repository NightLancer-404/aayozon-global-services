import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { CONTACT_DETAILS } from "@/lib/contact";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container-main section-padding">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/logo.png" alt="Aayozon" className="mb-4 h-16 w-auto rounded-lg bg-card p-2" />
          <p className="font-body text-sm leading-relaxed opacity-80">
            Aayozon Global Services Pvt. Ltd. is your trusted partner for world-class medical treatment combined with the beauty of India.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-display text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2 font-body text-sm opacity-80">
            {[{l:"About Us",t:"/about"},{l:"Treatments",t:"/treatments"},{l:"Packages",t:"/packages"},{l:"Travel Assistance",t:"/travel-assistance"},{l:"Hotels & Stay",t:"/hotels"},{l:"Blog",t:"/blog"},{l:"FAQ",t:"/faq"},{l:"Contact",t:"/contact"}].map(i=>(
              <li key={i.t}><Link to={i.t} className="transition-opacity hover:opacity-100">{i.l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-display text-lg font-semibold">Treatments</h4>
          <ul className="space-y-2 font-body text-sm opacity-80">
            {["Cardiology","Orthopedics","Cosmetic Surgery","IVF & Fertility","Oncology","Organ Transplant"].map(t=>(
              <li key={t}><Link to="/treatments" className="transition-opacity hover:opacity-100">{t}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-display text-lg font-semibold">Contact</h4>
          <ul className="space-y-3 font-body text-sm opacity-80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {CONTACT_DETAILS.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {CONTACT_DETAILS.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> {CONTACT_DETAILS.email}</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center font-body text-sm opacity-60">
        © {new Date().getFullYear()} Aayozon Global Services Pvt. Ltd. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
