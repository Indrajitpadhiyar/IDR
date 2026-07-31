import LegalLayout from './LegalLayout';

const Cancellation = () => {
  return (
    <LegalLayout title="Cancellation Policy" effectiveDate="April 13, 2026">
      <div className="space-y-10 text-sm leading-8 sm:text-base">
        <section>
          <p>This Cancellation Policy explains how project or service cancellation is handled by IDR Tech.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">1. Client Cancellation</h2>
          <p>The client may request cancellation of the project or service at any time by written notice. However, cancellation after project start may not qualify for a refund, and completed work and time invested will be chargeable.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">2. Non-Response from Client</h2>
          <p>If the client does not respond for an extended period, the project may be placed on hold. If there is no response for a long duration, IDR Tech may close the project temporarily or permanently.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">3. Delay in Payment</h2>
          <p>If payment is not made on time, work may be paused, support may be stopped, website delivery may be delayed, and maintenance services may be suspended.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">4. Cancellation by IDR Tech</h2>
          <p>We reserve the right to cancel or refuse service if the client violates our terms, the work requested is illegal or unethical, abusive behavior occurs, or required cooperation is not provided.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">5. Re-Activation</h2>
          <p>A paused or cancelled project may require a new timeline, revised pricing, or a fresh agreement before restarting.</p>
        </section>

        <section className="mt-12 pt-8 border-t border-[#0b63f6]/10">
          <h2 className="text-xl font-bold text-[#12306d] mb-4">6. Contact Information</h2>
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

export default Cancellation;
