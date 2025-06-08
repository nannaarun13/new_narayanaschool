
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { state } = useSchool();
  const { contactInfo } = state.data;

  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=8G49%2BHFJ%2C%20Sri%20Laxmi%20Nagar%20Colony%2C%20Badangpet%2C%20Hyderabad%2C%20Telangana%20500058', '_blank');
  };

  return (
    <div className="min-h-screen bg-school-white">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Page Header */}
        <section className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any queries, admissions, or general information
          </p>
        </section>

        {/* Contact Information Grid */}
        <section className="animate-fade-in">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-school-blue mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-school-blue mb-2">Address</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {contactInfo.address}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-orange/20">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-school-orange mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-school-orange mb-2">Phone Numbers</h3>
                <div className="text-gray-600 space-y-1">
                  {contactInfo.phoneNumbers && contactInfo.phoneNumbers.length > 0 ? (
                    contactInfo.phoneNumbers.map((phone, index) => (
                      <p key={index}>{phone}</p>
                    ))
                  ) : (
                    <p>{contactInfo.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-school-blue mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-school-blue mb-2">Email</h3>
                <p className="text-gray-600">
                  {contactInfo.email}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-orange/20">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-school-orange mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-school-orange mb-2">School Times</h3>
                <p className="text-gray-600">
                  Mon - Sat: 8:00 AM - 4:00 PM
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="animate-fade-in">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
            <CardHeader className="bg-school-blue-light">
              <CardTitle className="text-2xl text-school-blue">Find Us</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div 
                className="cursor-pointer rounded-lg overflow-hidden"
                onClick={handleMapClick}
                title="Click to open in Google Maps"
              >
                <div className="mapouter" style={{position: 'relative', textAlign: 'right', width: '100%', height: '450px'}}>
                  <div className="gmap_canvas" style={{overflow: 'hidden', background: 'none !important', width: '100%', height: '450px'}}>
                    <iframe 
                      width="100%" 
                      height="450px" 
                      style={{border: 0}} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade" 
                      src="https://www.google.com/maps/embed/v1/search?q=8G49%2BHFJ%2C%20Sri%20Laxmi%20Nagar%20Colony%2C%20Badangpet%2C%20Hyderabad%2C%20Telangana%20500058&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                      title="School Location"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Click on the map to open in Google Maps
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
