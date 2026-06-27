import { useEffect, useRef, useState } from 'react';
import { GitFork, Globe2, Mail, Network, Sparkle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Indrajit Padhiyar',
    role: 'Full Stack Developer',
    image: '/indrajit.png',
    portraitPosition: 'object-top',
    intro:
      "I'm Indrajit Padhiyar, a Full Stack Developer focused on creating scalable digital experiences, performant applications, and modern web solutions.",
    education: {
      year: '2024',
      degree: 'Information Engineering',
      university: 'Sigma University',
    },
    experience: {
      years: '2+ Years',
      projects: '30+ Projects',
      specialization: 'Full-stack web platforms',
    },
    stats: [
      { value: 30, suffix: '+', label: 'Projects' },
      { value: 2, suffix: '+', label: 'Years' },
      { value: 100, suffix: '%', label: 'Client Focus' },
    ],
    skills: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'GSAP', 'TailwindCSS'],
    socials: {
      github: 'https://github.com/Indrajitpadhiyar',
      linkedin: 'https://www.linkedin.com/in/indajit-padhiyar-6901083a8?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      portfolio: 'https://myportfolio-78uy.onrender.com/',
      email: 'indrajitpadgiyar107@gmail.com',
    },
  },
  {
    name: 'Drumul Thakor',
    role: 'Frontend Developer',
    image: '/drumil.jpeg',
    portraitPosition: 'object-center',
    intro:
      "I'm Drumul Thakor, a Frontend Developer crafting polished interfaces, refined motion, and responsive web experiences that feel effortless.",
    education: {
      year: '2024',
      degree: 'Computer Engineering',
      university: 'Creative Web Practice',
    },
    experience: {
      years: '2+ Years',
      projects: '20+ Projects',
      specialization: 'Frontend systems and motion',
    },
    stats: [
      { value: 20, suffix: '+', label: 'Projects' },
      { value: 2, suffix: '+', label: 'Years' },
      { value: 100, suffix: '%', label: 'Responsive Focus' },
    ],
    skills: ['React', 'JavaScript', 'TailwindCSS', 'GSAP', 'HTML5', 'CSS3', 'Framer Motion', 'Vite'],
    socials: {
      github: 'https://github.com/drumilthakor33',
      linkedin: 'https://www.linkedin.com/',
      portfolio: 'https://drumilthakor33.github.io/Portfolio/',
      email: 'drumil479@gmail.com',
    },
  },
  {
    name: 'Rohit Patil',
    role: 'UI/UX Designer',
    image: '/Rohit.jpeg',
    portraitPosition: 'object-top',
    intro:
      "I'm Rohit Patil, a UI/UX Designer shaping clear product stories, elegant visual systems, and interfaces built around real user behavior.",
    education: {
      year: '2024',
      degree: 'Design Systems',
      university: 'Digital Product Studio',
    },
    experience: {
      years: '2+ Years',
      projects: '22+ Projects',
      specialization: 'UI systems and brand experience',
    },
    stats: [
      { value: 22, suffix: '+', label: 'Projects' },
      { value: 2, suffix: '+', label: 'Years' },
      { value: 100, suffix: '%', label: 'UX Focus' },
    ],
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping', 'Wireframes', 'Design Systems', 'UX Research'],
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      portfolio: 'https://roohitportfolio.onrender.com/',
      email: 'mailto:hello@idrtech.in',
    },
  },
];

const socialItems = [
  { key: 'github', label: 'Github', icon: GitFork },
  { key: 'linkedin', label: 'LinkedIn', icon: Network },
  { key: 'portfolio', label: 'Portfolio', icon: Globe2 },
  { key: 'email', label: 'Email', icon: Mail },
];

const TeamOwners = () => {
  const rootRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const context = gsap.context(() => {
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const image = section.querySelector('.team-story__image');
        const portrait = section.querySelector('.team-story__portrait');
        const revealItems = section.querySelectorAll('.team-story__reveal');
        const skills = section.querySelectorAll('.team-story__skill');
        const stats = section.querySelectorAll('.team-story__stat-number');
        const watermark = section.querySelector('.team-story__watermark');
        const shapes = section.querySelectorAll('.team-story__shape');

        gsap.fromTo(
          image,
          { autoAlpha: 0, scale: 1.2, y: 70, rotate: index % 2 ? -2 : 2 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              end: 'center center',
              scrub: 0.8,
            },
          },
        );

        gsap.fromTo(
          revealItems,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 62%',
            },
          },
        );

        gsap.fromTo(
          skills,
          { autoAlpha: 0, y: 24, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.045,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 48%',
            },
          },
        );

        stats.forEach((stat) => {
          const target = Number(stat.dataset.value);
          const suffix = stat.dataset.suffix || '';
          const counter = { value: 0 };

          gsap.to(counter, {
            value: target,
            duration: 1.15,
            ease: 'power2.out',
            onUpdate: () => {
              stat.textContent = `${Math.round(counter.value)}${suffix}`;
            },
            scrollTrigger: {
              trigger: section,
              start: 'top 45%',
              once: true,
            },
          });
        });

        gsap.to(portrait, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(watermark, {
          xPercent: index % 2 ? 7 : -7,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(shapes, {
          y: (shapeIndex) => (shapeIndex % 2 ? 34 : -30),
          x: (shapeIndex) => (shapeIndex % 2 ? -18 : 16),
          rotate: (shapeIndex) => (shapeIndex % 2 ? -8 : 10),
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          onToggle: (self) => {
            gsap.to(section, {
              autoAlpha: self.isActive ? 1 : 0.58,
              duration: 0.4,
              ease: 'power2.out',
            });
          },
        });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="team"
      ref={rootRef}
      className="team-story"
      aria-label="Meet the IDR Tech team"
    >
      <div className="team-story__progress" aria-hidden="true">
        {teamMembers.map((member, index) => (
          <span key={member.name} className={index === activeIndex ? 'is-active' : ''} />
        ))}
      </div>

      {teamMembers.map((member, index) => (
        <article
          key={member.name}
          ref={(element) => {
            sectionRefs.current[index] = element;
          }}
          className="team-story__section"
        >
          <div className="team-story__watermark" aria-hidden="true">
            {member.role.split(' ')[0]}
          </div>

          <div className="team-story__vertical" aria-hidden="true">
            Team Member
          </div>

          <div className="team-story__media">
            <div className="team-story__glow" aria-hidden="true" />
            <div className="team-story__shape team-story__shape--blue" aria-hidden="true" />
            <div className="team-story__shape team-story__shape--orange" aria-hidden="true" />
            <div className="team-story__shape team-story__shape--glass" aria-hidden="true" />

            <div className="team-story__image">
              <img
                src={member.image}
                alt={member.name}
                width="620"
                height="760"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`team-story__portrait ${member.portraitPosition}`}
              />
            </div>
          </div>

          <div className="team-story__content">
            <span className="team-story__label team-story__reveal">
              <Sparkle className="h-4 w-4" />
              About me
            </span>

            <div className="team-story__headline team-story__reveal">
              <p>{member.name}</p>
              <h2>Hello.</h2>
            </div>

            <p className="team-story__intro team-story__reveal">{member.intro}</p>

            <div className="team-story__details team-story__reveal">
              <div>
                <span>Education</span>
                <strong>{member.education.year}</strong>
                <p>{member.education.degree}</p>
                <small>{member.education.university}</small>
              </div>
              <div>
                <span>Experience</span>
                <strong>{member.experience.years}</strong>
                <p>{member.experience.projects}</p>
                <small>{member.experience.specialization}</small>
              </div>
            </div>

            <div className="team-story__skills" aria-label={`${member.name} skills`}>
              {member.skills.map((skill) => (
                <span key={skill} className="team-story__skill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="team-story__stats team-story__reveal">
              {member.stats.map((stat) => (
                <div key={stat.label}>
                  <strong className="team-story__stat-number" data-value={stat.value} data-suffix={stat.suffix}>
                    0{stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="team-story__socials team-story__reveal">
              {socialItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a key={item.key} href={member.socials[item.key]} target="_blank" rel="noreferrer" aria-label={`${member.name} ${item.label}`}>
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default TeamOwners;