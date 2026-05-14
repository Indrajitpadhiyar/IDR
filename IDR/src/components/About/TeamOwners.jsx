import { ExternalLink, Star } from 'lucide-react';
import { motion } from 'motion/react';

const owners = [
  {
    name: 'Indrajit Padhiyar',
    role: 'Full-stack Developer',
    image: '/indrajit.png',
    link: 'https://myportfolio-78uy.onrender.com/',
    summary: 'Shapes the architecture, builds the product flow, and keeps the full experience clean, responsive, and stable.',
    expertise: ['React', 'Node.js', 'System thinking'],
  },
  {
    name: 'Drumil Thakor',
    role: 'Frontend Developer',
    image: '/drumil.jpeg',
    link: 'https://drumilthakor33.github.io/Portfolio/',
    summary: 'Focused on visual rhythm, interaction quality, and responsive detail that make interfaces feel polished.',
    expertise: ['UI engineering', 'Motion polish', 'Responsive design'],
  },
  {
    name: 'Rohit Patil',
    role: 'Designer',
    image: '/Rohit.jpeg',
    link: 'https://roohitportfolio.onrender.com/',
    summary: 'Creates the visual language, storytelling structure, and brand-first direction behind every interface.',
    expertise: ['Visual systems', 'Brand direction', 'UX storytelling'],
  },
];

const TeamOwners = () => {
  return (
    <section id="team" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-eyebrow">

            Our team
          </span>
          <h2 className="section-title mt-6 text-[#12306d]">
            Meet the team building websites, interfaces, and digital experiences at IDR Tech.
          </h2>
          <p className="section-copy mx-auto mt-6">
            We work closely across design and development so every project looks strong, feels smooth, and stays usable.
          </p>
        </motion.div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {owners.map((owner, index) => (
            <motion.article
              key={owner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="glass-panel h-full rounded-[36px] p-4"
            >
              <div className="flex h-full flex-col rounded-[30px] border border-white/75 bg-white/92 p-5 shadow-[0_22px_54px_rgba(11,99,246,0.08)]">
                <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,rgba(11,99,246,0.16),rgba(255,143,50,0.16),rgba(255,255,255,0.92))] p-4">
                  <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#12306d]">
                    <Star className="h-3.5 w-3.5 text-[#ff8f32]" />
                    Team IDR
                  </div>
                  <div className="mx-auto h-56 w-full max-w-[250px] overflow-hidden rounded-[24px] border border-white/75 bg-white shadow-[0_18px_40px_rgba(11,99,246,0.1)]">
                    <img
                      src={owner.image}
                      alt={owner.name}
                      width={250}
                      height={224}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b63f6]">{owner.role}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#12306d]">{owner.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#5e78ad]">{owner.summary}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {owner.expertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#0b63f6]/14 bg-[#eef4ff] px-4 py-2 text-xs font-semibold text-[#35538e]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={owner.link}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-btn-primary mt-auto w-full pt-4"
                >
                  View profile
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamOwners;