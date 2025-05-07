import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex text-4xl gap-10">
      <Link target="_blank" href="https://github.com/ivantm0">
        <FaGithub className="cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out" />
      </Link>
      <Link
        target="_blank"
        href="https://www.linkedin.com/in/ivanterolmartinez/"
      >
        <FaLinkedin className="cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out" />
      </Link>
      <Link
        target="_blank"
        href="https://api.whatsapp.com/send/?phone=34633045595"
      >
        <FaWhatsapp className="cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out" />
      </Link>
    </div>
  );
};

export default Socials;
