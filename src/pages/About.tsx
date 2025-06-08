
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const { state } = useSchool();
  const { 
    schoolHistory, 
    founderDetails = []
  } = state.data;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <section className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">
          About Our School
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn about our rich history, vision, and commitment to educational excellence
        </p>
      </section>

      {/* School History */}
      <section className="animate-fade-in">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-school-blue">Our History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {schoolHistory}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Founders */}
      <section className="animate-fade-in">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-school-blue">Our Founders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              {founderDetails && Array.isArray(founderDetails) && founderDetails.length > 0 ? (
                founderDetails.map((founder) => (
                  <div key={founder.id} className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-semibold text-school-blue mb-4">
                        {founder.name}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {founder.description}
                      </p>
                    </div>
                    <div>
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No founder information available at the moment.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Mission & Vision */}
      <section className="animate-fade-in">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-school-blue">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional education that empowers students to become 
                confident, creative, and compassionate individuals who contribute 
                positively to society while maintaining the highest academic standards.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-school-blue">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To be a leading educational institution that nurtures future leaders, 
                innovators, and global citizens through excellence in teaching, 
                character development, and holistic growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
