import Navbar from '../layouts/Navbar';
import Main from '../layouts/Main';
import Footer from '../layouts/Footer';

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-slate-950">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
