import logo from "../assets/logo.png";
import { Clock } from "lucide-react";

const MaintainencePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tertiary to-background">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <img
            src={logo || "/placeholder.svg"}
            alt="Logo"
            className="w-32 h-32 mx-auto object-contain"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-6 animate-text-blur">
          Under Maintenance
        </h1>
        <p className="text-xl text-textSecondary leading-relaxed mb-8 animate-text-blur-1 max-w-2xl mx-auto">
          We're currently updating our website to bring you an even better
          experience. Please check back soon!
        </p>
        <div className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white overflow-hidden shadow-lg">
          <Clock className="mr-2" size={24} />
          <span className="text-lg font-semibold">Check Back Later</span>
        </div>
      </div>
    </div>
  );
};

export default MaintainencePage;
