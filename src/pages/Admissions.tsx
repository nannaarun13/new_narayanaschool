
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSchool } from '@/contexts/SchoolContext';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

const Admissions = () => {
  const { toast } = useToast();
  const { dispatch } = useSchool();
  const [formData, setFormData] = useState({
    studentName: '',
    classApplied: '',
    presentClass: '',
    previousSchool: '',
    fatherName: '',
    motherName: '',
    primaryContact: '',
    secondaryContact: '',
    location: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convert text fields to uppercase
    if (['studentName', 'fatherName', 'motherName', 'previousSchool', 'location'].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.studentName || !formData.classApplied || !formData.presentClass || !formData.fatherName || !formData.motherName || !formData.primaryContact) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create inquiry object
    const inquiry = {
      id: Date.now().toString(),
      ...formData,
      submittedDate: new Date().toISOString().split('T')[0]
    };

    // Add to context
    dispatch({
      type: 'ADD_ADMISSION_INQUIRY',
      payload: inquiry
    });

    toast({
      title: "Application Submitted",
      description: "Your admission inquiry has been submitted successfully. We will contact you soon.",
    });

    // Reset form
    setFormData({
      studentName: '',
      classApplied: '',
      presentClass: '',
      previousSchool: '',
      fatherName: '',
      motherName: '',
      primaryContact: '',
      secondaryContact: '',
      location: '',
      additionalInfo: ''
    });
  };

  const admissionHighlights = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description: "Comprehensive curriculum designed for holistic development"
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Dedicated teachers committed to student success"
    },
    {
      icon: BookOpen,
      title: "Modern Facilities",
      description: "Well-equipped classrooms and laboratories"
    },
    {
      icon: Award,
      title: "Excellence Record",
      description: "Proven track record of academic achievements"
    }
  ];

  return (
    <div className="min-h-screen bg-school-white">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Page Header */}
        <section className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">
            Admissions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of learners and embark on a journey of academic excellence
          </p>
        </section>

        {/* Admission Highlights */}
        <section className="animate-fade-in">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {admissionHighlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <highlight.icon className="h-12 w-12 text-school-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-school-blue mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Admission Form */}
        <section className="animate-fade-in">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-school-blue-light">
              <CardTitle className="text-2xl text-school-blue text-center">
                Admission Inquiry Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="studentName">Student Name *</Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="Enter student name"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
                  </div>
                  <div>
                    <Label htmlFor="classApplied">Class Applied For *</Label>
                    <Input
                      id="classApplied"
                      name="classApplied"
                      value={formData.classApplied}
                      onChange={handleInputChange}
                      placeholder="e.g., Class 5, Class 10"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="presentClass">Present Class *</Label>
                    <Input
                      id="presentClass"
                      name="presentClass"
                      value={formData.presentClass}
                      onChange={handleInputChange}
                      placeholder="Current class of the student"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="previousSchool">Previous School</Label>
                    <Input
                      id="previousSchool"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      placeholder="Enter previous school name"
                    />
                    <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fatherName">Father's Name *</Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="Enter father's name"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
                  </div>
                  <div>
                    <Label htmlFor="motherName">Mother's Name *</Label>
                    <Input
                      id="motherName"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      placeholder="Enter mother's name"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryContact">Primary Contact Number *</Label>
                    <Input
                      id="primaryContact"
                      name="primaryContact"
                      value={formData.primaryContact}
                      onChange={handleInputChange}
                      placeholder="Enter primary contact number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryContact">Secondary Contact Number</Label>
                    <Input
                      id="secondaryContact"
                      name="secondaryContact"
                      value={formData.secondaryContact}
                      onChange={handleInputChange}
                      placeholder="Enter secondary contact number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter your location/address"
                  />
                  <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any additional information you'd like to share"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-school-blue hover:bg-school-blue/90 text-white py-3">
                  Submit Admission Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Admissions;
