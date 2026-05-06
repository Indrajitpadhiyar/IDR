import LegalLayout from './LegalLayout';

const Privacy = () => {
  return (
    <LegalLayout title="Privacy Policy" effectiveDate="April 13, 2026">
      <div className="space-y-10 text-sm leading-8 sm:text-base">
        <section>
          <p>At IDR Tech, we respect your privacy and are committed to protecting your personal information.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">1. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Business name</li>
            <li>Project details</li>
            <li>Any information submitted through contact forms, email, or WhatsApp</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">2. How We Use Your Information</h2>
          <p>We use your information to respond to inquiries, discuss project requirements, provide our services, improve our website, and communicate updates or support information.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">3. Sharing of Information</h2>
          <p>We do not sell, rent, or trade your personal information to third parties. We may share limited information only when necessary for service delivery (hosting, payment processors, legal authorities when required by law).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">4. Cookies and Tracking</h2>
          <p>Our website may use cookies to improve user experience, analyze traffic, and understand visitor behavior. You can disable cookies from your browser settings if you prefer.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">5. Data Security</h2>
          <p>We take reasonable steps to protect your information from unauthorized access. However, no online system is completely secure, so we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">6. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external websites.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">7. Your Rights</h2>
          <p>You may contact us to request access to your data, correct it, request deletion, or ask questions about how your information is used.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
        </section>

        <section className="mt-12 pt-8 border-t border-[#0b63f6]/10">
          <h2 className="text-xl font-bold text-[#12306d] mb-4">9. Contact Us</h2>
          <div className="space-y-2">
            <p><strong>IDR Tech</strong></p>
            <p>Email: <a href="mailto:idrtech23@gmail.com" className="text-[#0b63f6]">idrtech23@gmail.com</a></p>
            <p>Phone: +91 9714833771</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Privacy;
