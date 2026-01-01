import { MapPin } from "lucide-react";
import Link from "next/link";
import { MdOutlinePhoneIphone } from "react-icons/md";

export default function TopBar() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-6 text-sm">
            <a href="https://api.whatsapp.com/send?phone=+6281806040506&text=Hello%21%20." className="flex items-center space-x-2" target="_blank">
              <MdOutlinePhoneIphone className="w-4 h-4" />
              <span className="tracking-wider">+62 81806040506</span>
            </a>
            <Link href='/contact' className="items-center space-x-2 sm:flex hidden">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </Link>
          </div>
          <div className="flex items-center">
            {/* <select className="text-sm bg-white border-none outline-none cursor-pointer">
              <option>English</option>
              <option>Bahasa Indonesia</option>
            </select> */}
          </div>
        </div>
      </div>
    </div>
  )
}
