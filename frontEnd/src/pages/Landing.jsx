import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import LandingNav      from "../components/landing/LandingNav.jsx";
import HeroSection     from "../components/landing/HeroSection.jsx";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import HowItWorks      from "../components/landing/HowItWorks.jsx";
import CtaFooter       from "../components/landing/CtaFooter.jsx";

export default function Landing() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goToAnalyze = () => navigate(user ? "/upload" : "/register");

  return (
    <div className="min-h-screen bg-white">
      <LandingNav user={user} logout={logout} onAnalyzeClick={goToAnalyze} />
      <HeroSection onAnalyzeClick={goToAnalyze} />
      <FeaturesSection />
      <HowItWorks />
      <CtaFooter user={user} onAnalyzeClick={goToAnalyze} />
    </div>
  );
}