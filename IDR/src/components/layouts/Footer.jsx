import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative mt-12 overflow-hidden px-4 pb-12 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel overflow-hidden rounded-[48px] p-6 sm:p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            {/* Brand Section */}
            <div className="space-y-8">
              <Link to="/" className="group flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_12px_28px_rgba(11,99,246,0.12)]">
                  <img
                    src="/IDR.jpeg"
                    alt="IDR Tech logo"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-base font-bold uppercase tracking-[0.24em] text-[#0b63f6]">
                    IDR Tech
                  </p>
                  <p className="text-xs font-semibold text-[#5e78ad]">
                    Web design and development studio
                  </p>
                  <p className="text-[10px] font-semibold text-[#5e78ad]/80 mt-1">
                    Legal Owner: INDRAJITSINH RAJESHBHAI PADHIYAR
                  </p>
                </div>
              </Link>

              <p className="max-w-xs text-sm leading-7 text-[#5e78ad]">
                Providing high-quality web design, development, and digital
                solutions to help your business stand out in the digital
                landscape.
              </p>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 border border-white/60 shadow-sm text-[#0b63f6]">
                  <img src="/images/inovetive_logo.png" alt="" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b63f6]">
                  Innovation First
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#12306d]">
                Company
              </h4>
              <ul className="mt-8 space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        className="text-sm font-medium text-[#5e78ad] transition-colors hover:text-[#0b63f6]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm font-medium text-[#5e78ad] transition-colors hover:text-[#0b63f6]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#12306d]">
                Legal
              </h4>
              <ul className="mt-8 space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm font-medium text-[#5e78ad] transition-colors hover:text-[#0b63f6]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#12306d]">
                Reach Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0b63f6]/10 text-[#0b63f6]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#5e78ad]">
                      Email
                    </p>
                    <a
                      href="mailto:idrtech23@gmail.com"
                      className="text-sm font-semibold text-[#12306d]"
                    >
                      idrtech23@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0b63f6]/10 text-[#0b63f6]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#5e78ad]">
                      Phone
                    </p>
                    <a
                      href="tel:+919714833771"
                      className="text-sm font-semibold text-[#12306d]"
                    >
                      +91 9714833771
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0b63f6]/10 text-[#0b63f6]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#5e78ad]">
                      Address
                    </p>
                    <p className="text-sm font-semibold text-[#12306d]">
                      Bharuch, Gujarat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-[#0b63f6]/10 pt-8 text-center sm:text-left">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#5e78ad]">
                  © 2026 IDR Tech. All Rights Reserved.
                </p>
                <p className="text-xs text-[#5e78ad]/80">
                  IDR Tech is owned and operated by INDRAJITSINH RAJESHBHAI PADHIYAR.
                </p>
              </div>
              <p className="max-w-md text-xs leading-6 text-[#5e78ad]/80 sm:text-right">
                By using this website, you agree to our{" "}
                <Link to="/terms" className="text-[#0b63f6] hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#0b63f6] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
