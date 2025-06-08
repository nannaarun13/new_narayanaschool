
import { useSchool } from '@/contexts/SchoolContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { state } = useSchool();
  const { contactInfo } = state.data;

  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=8G49%2BHFJ%2C%20Sri%20Laxmi%20Nagar%20Colony%2C%20Badangpet%2C%20Hyderabad%2C%20Telangana%20500058', '_blank');
  };

  return (
    <footer className="bg-school-blue text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {contactInfo.address}
            </p>
          </div>

          {/* Phone Numbers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Phone Numbers
            </h3>
            <div className="space-y-1">
              {contactInfo.phoneNumbers && contactInfo.phoneNumbers.length > 0 ? (
                contactInfo.phoneNumbers.map((phone, index) => (
                  <p key={index} className="text-gray-300">{phone}</p>
                ))
              ) : (
                <p className="text-gray-300">{contactInfo.phone}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email
            </h3>
            <p className="text-gray-300">{contactInfo.email}</p>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location
            </h3>
            <button
              onClick={handleMapClick}
              className="bg-school-orange hover:bg-school-orange/80 text-white px-4 py-2 rounded transition-colors"
            >
              View on Google Maps
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} New Narayana School. All copyright reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
