
import { useSchool } from '@/contexts/SchoolContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const Header = () => {
  const { state } = useSchool();
  const { schoolName, schoolLogo, contactInfo } = state.data;

  const handleMapClick = () => {
    if (contactInfo.mapEmbed) {
      const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(contactInfo.address)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <header className="school-gradient text-white shadow-lg">
      {/* Contact Info Bar */}
      <div className="bg-school-blue text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center text-sm space-y-1 md:space-y-0">
            {/* Address */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-school-blue-light">{contactInfo.address}</span>
            </div>

            {/* Contact Numbers */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-school-blue-light">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-school-blue-light">{contactInfo.email}</span>
              </div>
            </div>

            {/* Map Link */}
            <div 
              className="cursor-pointer hover:text-school-orange transition-colors"
              onClick={handleMapClick}
              title="View on Google Maps"
            >
              <span className="text-sm">📍 View Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <img 
              src={schoolLogo} 
              alt="School Logo" 
              className="h-16 w-16 object-contain bg-white rounded-full p-1"
            />
            <div className="text-center">
              {state.data.schoolNameImage ? (
                <img 
                  src={state.data.schoolNameImage} 
                  alt={schoolName}
                  className="max-h-16 max-w-96 object-contain"
                />
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                  {schoolName}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
