import LegalLayout from './LegalLayout';

const Terms = () => {
  return (
    <LegalLayout title="Terms & Conditions" effectiveDate="April 13, 2026">
      <div className="space-y-10 text-sm leading-8 sm:text-base">
        <section>
          <p>Welcome to IDR Tech. By accessing our website or using our services, you agree to the following Terms & Conditions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">1. About Us</h2>
          <p>IDR Tech provides web-related services including, but not limited to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Website Design</li>
            <li>Website Development</li>
            <li>Website Maintenance</li>
            <li>E-commerce Website Development</li>
            <li>Custom Web Solutions</li>
            <li>Website Updates and Support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">2. Acceptance of Terms</h2>
          <p>By using our website or hiring our services, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, you should not use our services.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">3. Service Scope</h2>
          <p>Our services are provided based on the project requirements discussed with the client. The final scope of work may include Design and development of websites, Responsive layout creation, Basic SEO setup, Bug fixing, Website maintenance, Content updates, and Technical support as per selected plan.</p>
          <p className="mt-2 text-[#ff8f32] font-semibold">Any extra work outside the agreed scope may result in additional charges.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">4. Client Responsibilities</h2>
          <p>The client agrees to provide correct project details, share required content (images, logo, text, credentials) on time, review the work promptly, and ensure all materials shared are legal and authorized for use. Any delay from the client’s side may affect the project timeline.</p>
        </section>

        <section className="rounded-3xl bg-[#0b63f6]/5 p-6 border border-[#0b63f6]/10">
          <h2 className="text-xl font-bold text-[#0b63f6] mb-4">5. Payments</h2>
          <p>To begin work on a project, an <strong>advance payment of 30%</strong> is required.</p>
          <p className="mt-2">Payment terms include:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>30% Advance payment before project start</li>
            <li>Remaining balance before final delivery or launch</li>
            <li>Monthly or yearly maintenance payment, if applicable</li>
          </ul>
          <p className="mt-4 text-xs italic">Additional services, urgent changes, premium plugins, domain, hosting, third-party tools, or paid assets will be charged separately unless clearly included in the proposal.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">6. Revisions</h2>
          <p>A limited number of revisions may be included in the project package. Extra revisions or major changes after approval may result in additional charges.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">7. Delivery Timeline</h2>
          <p>We always try to deliver projects on time. However, delivery may be delayed due to delayed client response, missing content, change in project scope, or technical issues. Timelines given by IDR Tech are estimated unless specifically agreed otherwise.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">8. Website Maintenance</h2>
          <p>Maintenance plans may include updates, bug fixing, minor design/content changes, and security checks. Major redesign or new feature requests are not part of basic maintenance.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">9. Ownership</h2>
          <p>The final website or deliverables will be transferred to the client only after full payment is completed. Until full payment is received, all work remains the property of IDR Tech.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">10. Intellectual Property</h2>
          <p>The client is responsible for ensuring that all content provided to us does not violate copyright or legal rights. IDR Tech will not be liable for legal issues arising from client-provided content.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">11. Prohibited Use</h2>
          <p>Our services may not be used for illegal activity, fraud, malware, phishing, or adult content where not legally permitted. We reserve the right to refuse or stop service for such projects.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">12. Third-Party Services</h2>
          <p>Some projects may depend on third-party services (hosting, payment gateways, plugins, APIs). IDR Tech is not responsible for downtime or policy changes caused by these platforms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">13. Limitation of Liability</h2>
          <p>IDR Tech will not be liable for loss of data due to third-party issues, downtime, delays caused by the client, or indirect losses beyond our reasonable control.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">14. Project Hold or Termination</h2>
          <p>We reserve the right to put the project on hold or terminate service if payment is not made on time, the client remains unresponsive, or abusive behavior occurs.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">15. Changes to Terms</h2>
          <p>IDR Tech may update these Terms & Conditions from time to time. Updated terms will be posted on this website.</p>
        </section>

        <section className="mt-12 pt-8 border-t border-[#0b63f6]/10">
          <h2 className="text-xl font-bold text-[#12306d] mb-4">16. Contact Information</h2>
          <div className="space-y-2">
            <p><strong>IDR Tech</strong></p>
            <p>Email: <a href="mailto:idrtech23@gmail.com" className="text-[#0b63f6]">idrtech23@gmail.com</a></p>
            <p>Phone: +91 9714833771</p>
            <p>Address: Bharuch, Gujarat</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Terms;
