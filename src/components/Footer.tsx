
import { useSchool } from '@/contexts/SchoolContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { state } = useSchool();
  const { contactInfo } = state.data;

  const handleMapClick = () => {
    if (contactInfo.mapEmbed) {
      const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(contactInfo.address)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <footer className="bg-school-blue text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address
            </h3>
            <p className="text-school-blue-light leading-relaxed">
              {contactInfo.address}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-school-blue-light">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-school-blue-light">{contactInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Location</h3>
            {contactInfo.mapEmbed ? (
              <div 
                className="h-32 rounded-lg overflow-hidden cursor-pointer border border-white/20"
                onClick={handleMapClick}
                title="Click to open in Google Maps"
              >
                <iframe
                  src={contactInfo.mapEmbed}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location"
                />
              </div>
            ) : (
              <div className="h-32 bg-white/10 rounded-lg flex items-center justify-center">
                <p className="text-sm text-center text-school-blue-light">
                  Map will be displayed here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-sm text-school-blue-light">
            © {new Date().getFullYear()} All copyright reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
