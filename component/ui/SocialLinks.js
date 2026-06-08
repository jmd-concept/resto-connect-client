import { FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa';

const SOCIAL_LINKS = [
    { icon: <FaWhatsapp size={22} />, href: "https://wa.me/243838120851", color: "hover:text-green-500" },
    { icon: <FaInstagram size={22} />, href: "https://www.instagram.com/jmd_group3", color: "hover:text-pink-500" },
    { icon: <FaFacebookF size={22} />, href: "https://www.facebook.com/profile.php?id=61581381020725", color: "hover:text-blue-500" },
    { icon: <FaTiktok size={22} />, href: "https://www.tiktok.com/@jmd_group3", color: "hover:text-red-500" },
];

export function SocialLinks() {
    return (
        <div className="mt-4 flex gap-6 px-6 py-3 items-center justify-center rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
            {SOCIAL_LINKS.map((social, index) => (
                <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors duration-300`}
                >
                    {social.icon}
                </a>
            ))}
        </div>
    );
}