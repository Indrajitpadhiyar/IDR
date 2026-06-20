import { useEffect } from 'react';
import { applyRouteSeo } from '../../utils/seo';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import TechLab from './TechLab';

export default function TechShowcase() {
  useEffect(() => {
    applyRouteSeo('/tech-showcase');
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden text-[#12306d]">
      <Navbar />
      <TechLab variant="page" />
      <Footer />
    </div>
  );
}
