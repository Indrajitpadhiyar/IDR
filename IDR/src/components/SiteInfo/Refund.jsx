import LegalLayout from './LegalLayout';

const Refund = () => {
  return (
    <LegalLayout title="Refund Policy" effectiveDate="April 13, 2026">
      <div className="space-y-10 text-sm leading-8 sm:text-base">
        <section>
          <p>At IDR Tech, we work on custom digital services. Because of the nature of our work, our refund policy is as follows:</p>
        </section>

        <section className="rounded-3xl bg-[#ff8f32]/5 p-6 border border-[#ff8f32]/10">
          <h2 className="text-xl font-bold text-[#ff8f32] mb-4">1. Advance Payment</h2>
          <p>Any advance payment made to start a project is <strong>generally non-refundable</strong>. This covers the initial planning, consultation, and resource allocation for your project.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">2. Custom Services</h2>
          <p>Since website design, development, and maintenance are customized services, refunds are usually not available once the work has started.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">3. Cancellation After Work Starts</h2>
          <p>If the client cancels the project after the work has started, the advance payment will not be refunded, and charges may apply for the work already completed.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">4. Maintenance Services</h2>
          <p>Refunds for maintenance services depend on the selected plan. If work has already been performed for the billing cycle, a refund may not be provided.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">5. Third-Party Costs</h2>
          <p>Payments made for domain registration, hosting, paid plugins, themes, APIs, or ads are strictly <strong>non-refundable</strong> as they are paid directly to third-party providers.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#12306d] mb-4">6. Exceptional Cases</h2>
          <p>Any refund request will be reviewed at the sole discretion of IDR Tech. Approval of refund, if any, will depend on the project stage and total work completed up to that point.</p>
        </section>

        <section className="mt-12 pt-8 border-t border-[#0b63f6]/10">
          <h2 className="text-xl font-bold text-[#12306d] mb-4">7. Contact Information</h2>
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

export default Refund;
