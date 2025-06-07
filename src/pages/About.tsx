
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const { state } = useSchool();
  const { schoolHistory, yearEstablished, founderDetails = [] } = state.data;

  return (
    <div className="min-h-screen bg-school-white">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Page Header */}
        <section className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our journey of educational excellence and commitment to nurturing young minds
          </p>
        </section>

        {/* School History */}
        <section className="animate-fade-in">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
            <CardHeader className="bg-school-blue-light">
              <CardTitle className="text-3xl text-school-blue">Our History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg leading-relaxed text-gray-700">
                <p>{schoolHistory}</p>
                {yearEstablished && (
                  <p className="mt-4 font-semibold text-school-blue">
                    Established in {yearEstablished}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Founders Section */}
        {founderDetails && Array.isArray(founderDetails) && founderDetails.length > 0 && (
          <section className="animate-fade-in">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-school-orange/20">
              <CardHeader className="bg-school-orange-light">
                <CardTitle className="text-3xl text-school-blue">Our Founders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid gap-8">
                  {founderDetails.map((founder) => (
                    <div key={founder.id} className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-school-blue mb-3">
                          {founder.name}
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {founder.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Vision & Mission */}
        <section className="animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-school-blue/20">
              <CardHeader className="bg-school-blue-light">
                <CardTitle className="text-2xl text-school-blue">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To be a leading educational institution that nurtures young minds and shapes future leaders through innovative teaching methodologies and holistic development.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-school-orange/20">
              <CardHeader className="bg-school-orange-light">
                <CardTitle className="text-2xl text-school-blue">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To provide quality education that empowers students with knowledge, skills, and values necessary for success in an ever-changing world while fostering creativity and critical thinking.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
