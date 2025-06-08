
import { useSchool } from '@/contexts/SchoolContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const Header = () => {
  const { state } = useSchool();
  const { schoolName, schoolLogo, schoolNameImage, contactInfo } = state.data;

  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=8G49%2BHFJ%2C%20Sri%20Laxmi%20Nagar%20Colony%2C%20Badangpet%2C%20Hyderabad%2C%20Telangana%20500058', '_blank');
  };

  return (
    <header className="school-gradient text-white shadow-lg">
      {/* Contact Info Bar */}
      <div className="bg-school-blue-dark py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">{contactInfo.address.split(',')[0]}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{contactInfo.phoneNumbers && contactInfo.phoneNumbers.length > 0 ? contactInfo.phoneNumbers[0] : contactInfo.phone}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">{contactInfo.email}</span>
              </div>
              <button
                onClick={handleMapClick}
                className="flex items-center space-x-1 hover:text-school-orange transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">View Map</span>
              </button>
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
              {schoolNameImage ? (
                <img
                  src={schoolNameImage}
                  alt="School Name"
                  className="max-h-16 object-contain mx-auto"
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
