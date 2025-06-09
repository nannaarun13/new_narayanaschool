
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSchool } from '@/contexts/SchoolContext';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

const ContentManager = () => {
  const { state, dispatch } = useSchool();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('general');

  // General content
  const [generalData, setGeneralData] = useState({
    schoolName: state.data.schoolName,
    welcomeMessage: state.data.welcomeMessage,
    schoolHistory: state.data.schoolHistory
  });

  // Latest updates
  const [newUpdate, setNewUpdate] = useState({ content: '' });

  // Founder details
  const [newFounder, setNewFounder] = useState({
    name: '',
    description: '',
    image: ''
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveGeneral = () => {
    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: generalData
    });
    toast({
      title: "Content Updated",
      description: "General content has been updated successfully.",
    });
  };

  const handleSchoolLogoUpload = (imageUrl: string) => {
    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: { schoolLogo: imageUrl }
    });
    toast({
      title: "School Logo Updated",
      description: "School logo has been updated successfully.",
    });
  };

  const handleSchoolImageUpload = (imageUrl: string) => {
    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: { schoolImage: imageUrl }
    });
    toast({
      title: "School Image Updated",
      description: "School main image has been updated successfully.",
    });
  };

  const handleSchoolNameImageUpload = (imageUrl: string) => {
    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: { schoolNameImage: imageUrl }
    });
    toast({
      title: "School Name Image Updated",
      description: "School name image has been updated successfully.",
    });
  };

  const handleWelcomeImageUpload = (imageUrl: string) => {
    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: { welcomeImage: imageUrl }
    });
    toast({
      title: "Welcome Image Updated",
      description: "Welcome section image has been updated successfully.",
    });
  };

  const handleAddUpdate = () => {
    if (!newUpdate.content.trim()) {
      toast({
        title: "Missing Content",
        description: "Please enter update content.",
        variant: "destructive"
      });
      return;
    }

    const update = {
      id: Date.now().toString(),
      content: newUpdate.content,
      date: new Date().toISOString().split('T')[0]
    };

    dispatch({
      type: 'ADD_LATEST_UPDATE',
      payload: update
    });

    setNewUpdate({ content: '' });
    toast({
      title: "Update Added",
      description: "Latest update has been added successfully.",
    });
  };

  const handleDeleteUpdate = (id: string) => {
    dispatch({
      type: 'DELETE_LATEST_UPDATE',
      payload: id
    });
    toast({
      title: "Update Deleted",
      description: "Update has been removed successfully.",
    });
  };

  const handleFounderImageUpload = (imageUrl: string) => {
    setNewFounder(prev => ({ ...prev, image: imageUrl }));
  };

  const handleAddFounder = () => {
    if (!newFounder.name || !newFounder.description || !newFounder.image) {
      toast({
        title: "Missing Information",
        description: "Please fill all founder details and upload an image.",
        variant: "destructive"
      });
      return;
    }

    const founder = {
      id: Date.now().toString(),
      ...newFounder
    };

    dispatch({
      type: 'ADD_FOUNDER',
      payload: founder
    });

    setNewFounder({ name: '', description: '', image: '' });
    toast({
      title: "Founder Added",
      description: "Founder details have been added successfully.",
    });
  };

  const handleDeleteFounder = (id: string) => {
    dispatch({
      type: 'DELETE_FOUNDER',
      payload: id
    });
    toast({
      title: "Founder Deleted",
      description: "Founder has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
      </div>

      {/* Section Tabs */}
      <div className="flex space-x-2 border-b">
        <Button
          variant={activeSection === 'general' ? 'default' : 'ghost'}
          onClick={() => setActiveSection('general')}
        >
          General Content
        </Button>
        <Button
          variant={activeSection === 'updates' ? 'default' : 'ghost'}
          onClick={() => setActiveSection('updates')}
        >
          Latest Updates
        </Button>
        <Button
          variant={activeSection === 'founders' ? 'default' : 'ghost'}
          onClick={() => setActiveSection('founders')}
        >
          Founders
        </Button>
      </div>

      {/* General Content */}
      {activeSection === 'general' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                General Information
                <Button onClick={handleSaveGeneral} className="bg-school-blue hover:bg-school-blue/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  value={generalData.schoolName}
                  onChange={handleGeneralChange}
                />
              </div>

              <div>
                <ImageUpload
                  label="School Logo"
                  currentImage={state.data.schoolLogo}
                  onImageUpload={handleSchoolLogoUpload}
                />
              </div>

              <div>
                <ImageUpload
                  label="School Main Image"
                  currentImage={state.data.schoolImage}
                  onImageUpload={handleSchoolImageUpload}
                />
              </div>

              <div>
                <ImageUpload
                  label="School Name Image (replaces text header)"
                  currentImage={state.data.schoolNameImage}
                  onImageUpload={handleSchoolNameImageUpload}
                />
              </div>

              <div>
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  name="welcomeMessage"
                  value={generalData.welcomeMessage}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>

              <div>
                <ImageUpload
                  label="Welcome Section Image"
                  currentImage={state.data.welcomeImage}
                  onImageUpload={handleWelcomeImageUpload}
                />
              </div>

              <div>
                <Label htmlFor="schoolHistory">School History</Label>
                <Textarea
                  id="schoolHistory"
                  name="schoolHistory"
                  value={generalData.schoolHistory}
                  onChange={handleGeneralChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Latest Updates */}
      {activeSection === 'updates' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="updateContent">Update Content</Label>
                <Textarea
                  id="updateContent"
                  value={newUpdate.content}
                  onChange={(e) => setNewUpdate({ content: e.target.value })}
                  placeholder="Enter the latest update"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddUpdate} className="bg-school-blue hover:bg-school-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Update
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.data.latestUpdates.map((update) => (
                  <div key={update.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{update.content}</p>
                      <p className="text-sm text-gray-600">{update.date}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUpdate(update.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Founders */}
      {activeSection === 'founders' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Founder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="founderName">Founder Name</Label>
                <Input
                  id="founderName"
                  value={newFounder.name}
                  onChange={(e) => setNewFounder(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter founder name"
                />
              </div>
              <div>
                <Label htmlFor="founderDescription">Description</Label>
                <Textarea
                  id="founderDescription"
                  value={newFounder.description}
                  onChange={(e) => setNewFounder(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter founder description"
                  rows={3}
                />
              </div>
              <ImageUpload
                label="Founder Image"
                currentImage={newFounder.image}
                onImageUpload={handleFounderImageUpload}
              />
              <Button onClick={handleAddFounder} className="bg-school-blue hover:bg-school-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Founder
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Founders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {state.data.founderDetails.map((founder) => (
                  <div key={founder.id} className="border rounded-lg p-4">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      <div className="md:col-span-2">
                        <h3 className="font-semibold">{founder.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{founder.description}</p>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteFounder(founder.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
