import { Mail, Phone } from "lucide-react";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/AncoraThemes/", icon: FiFacebook },
  { name: "Instagram", href: "https://www.instagram.com/ancora_themes/", icon: FiInstagram },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCdIjRh7-lPVHqTTKpaf8PLA", icon: FiYoutube },
];

export default function Topbar() {
  return (
    <div className="hidden md:block bg-[#0f2847] text-white text-[15px]">
      {/* Changed max-width and px to match Navbar exactly */}
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 lg:px-12 py-3.5">
        
        {/* Left */}
        <div className="flex items-center gap-6 font-medium">
          <a href="mailto:admin@yuvamitra.org" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <Mail size={14} className="text-white" />
            <span>admin@yuvamitra.org</span>
          </a>

          <a href="tel:+919527402400" className="flex items-center gap-2 border-l border-white/20 pl-5 hover:text-blue-300 transition-colors">
            <Phone size={14} className="text-white" />
            <span>+91 9527402400</span>
          </a>
        </div>

        {/* Right */}
       {/* Right Side of Topbar */}
<div className="flex items-center gap-5 pr-1.5"> {/* Added pr-1.5 to shift icons left */}
  {socialLinks.map(({ name, href, icon }) => (
    <a 
      key={name} 
      href={href} 
      target="_blank"
      rel="noopener noferrer"
      className=" flex text-white/80 rounded-full transition-transform hover:scale-110"
    >
      {icon({ size: 18 })}
    </a>
  ))}
</div>
      </div>
    </div>
  );
}
