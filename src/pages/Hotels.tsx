import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, MapPin, Wifi, UtensilsCrossed, HeartPulse, Star, Building2, DollarSign, Car, Phone } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { motion, useScroll, useTransform } from "framer-motion";
import locationPin from "@/assets/location-pin.png";
import stethoscope from "@/assets/stethoscope.png";
import hotelLuxury from "@/assets/hotel-luxury.jpg";
import hotelBudget from "@/assets/hotel-budget.jpg";
import hotelApartment from "@/assets/hotel-apartment.jpg";
import hotelGuesthouse from "@/assets/hotel-guesthouse.jpg";
import hospitalImg from "@/assets/hospital-modern.jpg";
import { useState } from "react";

const categories = [
  { title: "Budget Hotels", desc: "Clean, comfortable, and affordable stays within walking distance of major hospitals.", img: hotelBudget, price: "$25 - $50/night" },
  { title: "Premium Hotels", desc: "4-star hotels with excellent service, room service, and medical transport coordination.", img: hospitalImg, price: "$50 - $120/night" },
  { title: "Luxury Hotels", desc: "5-star luxury with spa, wellness centers, and dedicated patient concierge services.", img: hotelLuxury, price: "$120 - $300/night" },
  { title: "Service Apartments", desc: "Fully furnished apartments ideal for long-stay patients with families.", img: hotelApartment, price: "$40 - $100/night" },
  { title: "Hospital Guest Houses", desc: "On-campus or nearby hospital accommodation with direct medical support access.", img: hotelGuesthouse, price: "$20 - $60/night" },
];

const hotels = [
  {
    slug: "taj-palace-delhi", name: "Taj Palace, New Delhi", location: "Delhi", price: "$180 - $350/night", distanceFromHospital: "2 km from Max Super Speciality",
    img: hotelLuxury, category: "Luxury",
    amenities: ["Free WiFi", "24/7 Room Service", "Medical Support Access", "Airport Shuttle", "Spa & Wellness", "International Cuisine"],
    description: "Experience world-class luxury at Taj Palace, offering spacious rooms with stunning views of Delhi's diplomatic enclave. With a dedicated medical guest coordinator, patients enjoy seamless hospital transfers and in-room medical equipment upon request.",
    nearbyHospitals: ["Max Super Speciality Hospital (2 km)", "AIIMS (4 km)", "Medanta Gurugram (18 km)"],
    gallery: [hotelLuxury, hospitalImg, hotelApartment],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.17!3d28.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzI0LjAiTiA3N8KwMTAnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  },
  {
    slug: "itc-grand-mumbai", name: "ITC Grand Central, Mumbai", location: "Mumbai", price: "$150 - $280/night", distanceFromHospital: "3 km from Kokilaben Hospital",
    img: hospitalImg, category: "Luxury",
    amenities: ["Free WiFi", "Medical Concierge", "International Dining", "Airport Transfers", "Fitness Center", "Laundry Service"],
    description: "ITC Grand Central offers luxury accommodation in the heart of Mumbai with personalized medical tourism support. Their experienced concierge team coordinates with partner hospitals for appointments, transport, and dietary needs.",
    nearbyHospitals: ["Kokilaben Dhirubhai Ambani Hospital (3 km)", "Lilavati Hospital (5 km)", "Hinduja Hospital (4 km)"],
    gallery: [hospitalImg, hotelLuxury, hotelBudget],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d72.83!3d19.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAxJzEyLjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  },
  {
    slug: "comfort-inn-chennai", name: "Comfort Inn Marina, Chennai", location: "Chennai", price: "$40 - $75/night", distanceFromHospital: "1.5 km from Apollo Hospital",
    img: hotelBudget, category: "Budget",
    amenities: ["Free WiFi", "Complimentary Breakfast", "Medical Support", "Local Transport Help", "24/7 Front Desk", "Meal Plans"],
    description: "A comfortable and affordable hotel just minutes from Apollo and MIOT hospitals. Ideal for budget-conscious medical tourists seeking clean, reliable accommodation with helpful staff experienced in assisting international patients.",
    nearbyHospitals: ["Apollo Hospital Chennai (1.5 km)", "MIOT International (3 km)", "Fortis Malar (4 km)"],
    gallery: [hotelBudget, hotelGuesthouse, hospitalImg],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d80.27!3d13.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM2LjAiTiA4MMKwMTYnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  },
  {
    slug: "greenview-apartment-bangalore", name: "Greenview Service Apartments, Bangalore", location: "Bangalore", price: "$55 - $90/night", distanceFromHospital: "2 km from Manipal Hospital",
    img: hotelApartment, category: "Service Apartment",
    amenities: ["Free WiFi", "Full Kitchen", "Washing Machine", "Medical Taxi on Call", "Weekly Housekeeping", "Family-friendly"],
    description: "Spacious fully-furnished apartments ideal for patients traveling with families. Located near Bangalore's top hospitals, these apartments offer a home-like environment with full kitchen facilities for special dietary needs.",
    nearbyHospitals: ["Manipal Hospital (2 km)", "Narayana Health (5 km)", "Aster CMI (6 km)"],
    gallery: [hotelApartment, hotelBudget, hotelLuxury],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.59!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEyLjAiTiA3N8KwMzUnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  },
  {
    slug: "apollo-guest-house-delhi", name: "Apollo Guest House, Delhi", location: "Delhi", price: "$30 - $55/night", distanceFromHospital: "On-campus, Apollo Hospital",
    img: hotelGuesthouse, category: "Hospital Guest House",
    amenities: ["Free WiFi", "Meals Included", "Direct Hospital Access", "Nurse on Call", "Pharmacy Nearby", "24/7 Security"],
    description: "Located within the Apollo Hospital campus, this guest house provides the most convenient option for patients and attendants. With direct access to the hospital, on-call nursing support, and included meals, recovery is made comfortable and safe.",
    nearbyHospitals: ["Apollo Hospital Delhi (On-campus)", "Max Saket (3 km)", "Fortis Escort (5 km)"],
    gallery: [hotelGuesthouse, hospitalImg, hotelBudget],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5!2d77.28!3d28.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzI0LjAiTiA3N8KwMTYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  },
];

export const HotelsListPage = () => {
  const { scrollY } = useScroll();
  const pinY = useTransform(scrollY, [0, 500], [0, -30]);
  const stethY = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <div className="font-body">
      {/* ===== HERO ===== */}
      <section className="hero-gradient-bg relative overflow-hidden">
        <div className="container-main section-padding">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <AnimatedSection>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
                Comfortable Stays for a <span className="gradient-text">Peaceful Recovery</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Patient-friendly accommodations near India's best hospitals — from budget stays to luxury recoveries, tailored for your comfort and convenience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#hotel-list" className="btn-primary-medical text-base">
                  Browse Hotels <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/contact" className="btn-secondary-medical text-base">Enquire Now</Link>
              </div>
            </AnimatedSection>
            <div className="relative flex min-h-[300px] items-center justify-center">
              <motion.img src={locationPin} alt="" className="absolute bottom-4 right-12 h-12 w-12 opacity-50" style={{ y: pinY }} />
              <motion.img src={stethoscope} alt="" className="absolute left-4 top-4 h-14 w-14 opacity-40" style={{ y: stethY }} />
              <img src={hotelLuxury} alt="Luxury hotel" className="relative z-10 max-h-[320px] w-full rounded-2xl object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section-alt section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Accommodation <span className="gradient-text">Categories</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Choose from a range of patient-friendly stays to suit your budget and needs</p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(c => (
              <AnimatedSection key={c.title}>
                <div className="card-medical group overflow-hidden p-0">
                  <div className="relative h-44 overflow-hidden">
                    <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute bottom-3 right-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">{c.price}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                    <a href="#hotel-list" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View Options <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOTEL LISTING ===== */}
      <section id="hotel-list" className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Featured <span className="gradient-text">Hotels</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Handpicked patient-friendly accommodations across India</p>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map(h => (
              <AnimatedSection key={h.slug}>
                <Link to={`/hotels/${h.slug}`} className="card-medical group overflow-hidden p-0">
                  <div className="relative h-52 overflow-hidden">
                    <img src={h.img} alt={h.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{h.category}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{h.name}</h3>
                    <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{h.location}</p>
                      <p className="flex items-center gap-2"><DollarSign className="h-4 w-4 shrink-0 text-accent" />{h.price}</p>
                      <p className="flex items-center gap-2"><Building2 className="h-4 w-4 shrink-0 text-secondary" />{h.distanceFromHospital}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {h.amenities.slice(0, 3).map(a => (
                        <span key={a} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{a}</span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View Details <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-alt section-padding">
        <div className="container-main text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Need Help <span className="gradient-text">Choosing?</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Our accommodation specialists will find the perfect stay near your hospital based on your budget and preferences.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary-medical text-base">Get Accommodation Help <ArrowRight className="h-5 w-5" /></Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="btn-secondary-medical text-base">
                <Phone className="h-5 w-5" /> WhatsApp Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export const HotelDetailPage = () => {
  const { slug } = useParams();
  const hotel = hotels.find(h => h.slug === slug);
  const [formData, setFormData] = useState({ name: "", country: "", dates: "", message: "" });

  if (!hotel) return (
    <div className="section-padding container-main text-center">
      <h1 className="font-display text-2xl">Hotel not found</h1>
      <Link to="/hotels" className="btn-primary-medical mt-4 inline-flex">Back to Hotels</Link>
    </div>
  );

  return (
    <div className="font-body">
      {/* Gallery Hero */}
      <section className="relative">
        <div className="grid h-72 grid-cols-3 gap-1 md:h-96">
          {hotel.gallery.map((img, i) => (
            <div key={i} className={`overflow-hidden ${i === 0 ? "col-span-2 row-span-1" : ""}`}>
              <img src={img} alt={hotel.name} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-main">
            <Link to="/hotels" className="mb-2 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground">
              <ChevronRight className="h-4 w-4 rotate-180" /> All Hotels
            </Link>
            <h1 className="font-display text-3xl font-extrabold text-primary-foreground md:text-4xl">{hotel.name}</h1>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm"><MapPin className="mr-1 inline h-3 w-3" />{hotel.location}</span>
              <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm">{hotel.category}</span>
              <span className="rounded-full bg-accent/80 px-3 py-1 text-sm font-semibold text-accent-foreground">{hotel.price}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <AnimatedSection className="card-medical">
              <h3 className="font-display text-lg font-semibold text-foreground">About This Hotel</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{hotel.description}</p>
            </AnimatedSection>

            <AnimatedSection className="card-medical">
              <h3 className="font-display text-lg font-semibold text-foreground">Amenities</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {hotel.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      {a.includes("WiFi") ? <Wifi className="h-4 w-4 text-primary" /> :
                       a.includes("Meal") || a.includes("Breakfast") || a.includes("Dining") || a.includes("Cuisine") || a.includes("Room Service") ? <UtensilsCrossed className="h-4 w-4 text-primary" /> :
                       a.includes("Medical") || a.includes("Nurse") ? <HeartPulse className="h-4 w-4 text-primary" /> :
                       a.includes("Airport") || a.includes("Transport") || a.includes("Taxi") || a.includes("Shuttle") ? <Car className="h-4 w-4 text-primary" /> :
                       <Star className="h-4 w-4 text-primary" />}
                    </div>
                    {a}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="card-medical">
              <h3 className="font-display text-lg font-semibold text-foreground">Nearby Hospitals</h3>
              <ul className="mt-3 space-y-2">
                {hotel.nearbyHospitals.map(h => (
                  <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0 text-secondary" />{h}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="card-medical overflow-hidden p-0">
              <h3 className="p-6 pb-0 font-display text-lg font-semibold text-foreground">Location</h3>
              <div className="mt-4 h-64">
                <iframe src={hotel.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Hotel Location" />
              </div>
            </AnimatedSection>
          </div>

          <div className="space-y-6">
            <div className="card-medical">
              <h4 className="font-display font-semibold text-foreground">Price Range</h4>
              <p className="mt-1 text-2xl font-bold text-primary">{hotel.price}</p>
            </div>
            <div className="card-medical">
              <h4 className="font-display font-semibold text-foreground">Distance from Hospital</h4>
              <p className="mt-1 text-muted-foreground">{hotel.distanceFromHospital}</p>
            </div>

            <div className="card-medical">
              <h4 className="mb-4 font-display font-semibold text-foreground">Book / Enquire</h4>
              <form onSubmit={e => { e.preventDefault(); alert("Thank you! We will get back to you soon."); }} className="space-y-3">
                <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <input type="text" placeholder="Country" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <input type="text" placeholder="Travel Dates" value={formData.dates} onChange={e => setFormData({ ...formData, dates: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <textarea placeholder="Any special requirements..." rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <button type="submit" className="btn-primary-medical w-full text-sm">Book Now <ArrowRight className="h-4 w-4" /></button>
              </form>
            </div>

            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="btn-secondary-medical w-full text-center text-sm">
              <Phone className="h-4 w-4" /> WhatsApp Enquiry
            </a>
            <Link to="/packages" className="btn-secondary-medical w-full text-center text-sm">View Medical Packages</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
