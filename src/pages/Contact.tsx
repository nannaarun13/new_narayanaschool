
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { state } = useSchool();
  const { contactInfo } = state.data;

  const handleMapClick = () => {
    if (contactInfo.mapEmbed) {
      // Extract location from embed URL or use the address
      const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(contactInfo.address)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <p>{contactInfo.phone}</p>
                  {contactInfo.phone2 && <p>{contactInfo.phone2}</p>}
                  {contactInfo.phone3 && <p>{contactInfo.phone3}</p>}
                  {contactInfo.phone4 && <p>{contactInfo.phone4}</p>}
                  {contactInfo.phone5 && <p>{contactInfo.phone5}</p>}
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
            <CardContent>
              {contactInfo.mapEmbed ? (
                <div 
                  className="h-64 rounded-lg overflow-hidden cursor-pointer"
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
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                  <p className="text-gray-500 text-center">
                    Map will be displayed here<br />
                    (Admin can update location through admin panel)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
