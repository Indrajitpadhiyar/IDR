import LegalLayout from './LegalLayout';

const Disclaimer = () => {
  return (
    <LegalLayout title="Disclaimer" effectiveDate="April 13, 2026">
      <div className="space-y-10 text-sm leading-8 sm:text-base">
        <section>
          <p>The information provided on the IDR Tech website is for general business and service information purposes only.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">Accuracy & Guarantees</h2>
          <p>While we try to keep all information accurate and updated, we make no guarantees about completeness, accuracy, reliability, suitability, or availability. Any action you take based on information from this website is strictly at your own risk.</p>
        </section>

        <section className="rounded-3xl bg-[#ff8f32]/5 p-6 border border-[#ff8f32]/10 text-[#d36e10]">
          <h2 className="text-xl font-bold mb-4 font-sora">Limitation of Responsibility</h2>
          <p>IDR Tech is not responsible for losses caused by:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2 font-medium">
            <li>Technical downtime or server issues</li>
            <li>Third-party failures (hosting, APIs, plugins)</li>
            <li>Inaccurate user-provided data</li>
            <li>Misuse of services</li>
          </ul>
        </section>

        <section>
          <p>We strive to provide excellent service, but we cannot be held liable for factors outside of our direct control during the development or maintenance phases.</p>
        </section>

        <section className="mt-12 pt-8 border-t border-[#0b63f6]/10">
          <h2 className="text-xl font-bold text-[#12306d] mb-4">Contact Information</h2>
          <div className="space-y-2">
            <p><strong>IDR Tech</strong></p>
            <p>Owned and Operated by: <strong>INDRAJITSINH RAJESHBHAI PADHIYAR</strong></p>
            <p>Legal Owner: <strong>INDRAJITSINH RAJESHBHAI PADHIYAR</strong></p>
            <p>Website: <a href="https://idrtech.in" className="text-[#0b63f6]">https://idrtech.in</a></p>
            <p>Email: <a href="mailto:idrtech23@gmail.com" className="text-[#0b63f6]">idrtech23@gmail.com</a></p>
            <p>Phone: +91 9714833771</p>
            <p>Address: Bharuch, Gujarat</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Disclaimer;
