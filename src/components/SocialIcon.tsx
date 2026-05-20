import { FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  Instagram: FaInstagram,
  Camera: FaInstagram,
  youtube: FaYoutube,
  YouTube: FaYoutube,
  CirclePlay: FaYoutube,
  linkedin: FaLinkedinIn,
  LinkedIn: FaLinkedinIn,
  Briefcase: FaLinkedinIn,
  twitter: FaXTwitter,
  Twitter: FaXTwitter,
  email: HiOutlineMail,
  Email: HiOutlineMail,
  Mail: HiOutlineMail,
};

export function SocialIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Comp = iconMap[name];
  if (!Comp) return null;
  return <Comp className={className} />;
}
