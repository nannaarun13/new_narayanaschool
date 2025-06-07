
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, Award, Globe } from 'lucide-react';

const About = () => {
  const { state } = useSchool();
  const { schoolHistory, founderDetails } = state.data;

  // Safe access to founderDetails with fallback
  const founders = Array.isArray(founderDetails) ? founderDetails : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Page Header */}
        <section className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our mission, vision, and commitment to excellence in education
          </p>
        </section>

        {/* School History */}
        <section className="animate-fade-in">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-school-blue mb-6 text-center">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {schoolHistory}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Grid */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-bold text-school-blue mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
              <CardContent className="p-6">
                <GraduationCap className="h-16 w-16 text-school-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-school-blue mb-2">Academic Excellence</h3>
                <p className="text-gray-600">
                  Committed to providing high-quality education that prepares students for future success.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-orange/20">
              <CardContent className="p-6">
                <Users className="h-16 w-16 text-school-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-school-orange mb-2">Character Building</h3>
                <p className="text-gray-600">
                  Fostering values, ethics, and moral principles that shape responsible citizens.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
              <CardContent className="p-6">
                <Award className="h-16 w-16 text-school-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-school-blue mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Embracing modern teaching methods and technology to enhance learning experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-school-orange/20">
              <CardContent className="p-6">
                <Globe className="h-16 w-16 text-school-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-school-orange mb-2">Global Perspective</h3>
                <p className="text-gray-600">
                  Preparing students to be global citizens with a broad understanding of the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Founders Section */}
        {founders.length > 0 && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-school-blue mb-8 text-center">
              Our Founders
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {founders.map((founder) => (
                <Card key={founder.id} className="hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
                  <CardContent className="p-6 text-center">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-school-blue/20"
                    />
                    <h3 className="text-xl font-semibold text-school-blue mb-2">
                      {founder.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {founder.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default About;
