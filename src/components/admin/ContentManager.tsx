
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSchool } from '@/contexts/SchoolContext';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Edit, Trash2, X } from 'lucide-react';
import ImageUpload from './ImageUpload';

const ContentManager = () => {
  const { state, dispatch } = useSchool();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    schoolLogo: state.data.schoolLogo,
    schoolName: state.data.schoolName,
    welcomeMessage: state.data.welcomeMessage,
    welcomeImage: state.data.welcomeImage,
    schoolHistory: state.data.schoolHistory,
    yearEstablished: state.data.yearEstablished,
    educationalSociety: state.data.educationalSociety
  });

  // Latest Updates management
  const [newUpdate, setNewUpdate] = useState({ content: '' });
  const [editingUpdate, setEditingUpdate] = useState<string | null>(null);
  const [editUpdateData, setEditUpdateData] = useState({ content: '' });

  // Founder management
  const [newFounder, setNewFounder] = useState({ name: '', description: '', image: '' });
  const [editingFounder, setEditingFounder] = useState<string | null>(null);
  const [editFounderData, setEditFounderData] = useState({ name: '', description: '', image: '' });

  // Safe access to founderDetails with fallback
  const founderDetails = Array.isArray(state.data.founderDetails) ? state.data.founderDetails : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (field: string, imageUrl: string) => {
    setFormData(prev => ({ ...prev, [field]: imageUrl }));
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: formData
    });
    toast({
      title: "Content Updated",
      description: "School content has been updated successfully.",
    });
  };

  // Latest Updates functions
  const handleAddUpdate = () => {
    if (!newUpdate.content) {
      toast({
        title: "Missing Information",
        description: "Please provide update content.",
        variant: "destructive"
      });
      return;
    }

    const updateData = {
      id: Date.now().toString(),
      content: newUpdate.content,
      date: new Date().toISOString().split('T')[0]
    };

    dispatch({
      type: 'ADD_LATEST_UPDATE',
      payload: updateData
    });

    setNewUpdate({ content: '' });
    toast({
      title: "Update Added",
      description: "New update has been added.",
    });
  };

  const handleEditUpdate = (update: any) => {
    setEditingUpdate(update.id);
    setEditUpdateData({ content: update.content });
  };

  const handleSaveUpdateEdit = () => {
    if (!editUpdateData.content) {
      toast({
        title: "Missing Information",
        description: "Please provide update content.",
        variant: "destructive"
      });
      return;
    }

    dispatch({
      type: 'UPDATE_LATEST_UPDATE',
      payload: { id: editingUpdate, update: editUpdateData }
    });

    setEditingUpdate(null);
    setEditUpdateData({ content: '' });
    toast({
      title: "Update Modified",
      description: "Update has been modified successfully.",
    });
  };

  const handleDeleteUpdate = (id: string) => {
    dispatch({
      type: 'DELETE_LATEST_UPDATE',
      payload: id
    });
    toast({
      title: "Update Deleted",
      description: "Update has been removed.",
    });
  };

  // Founder functions
  const handleAddFounder = () => {
    if (!newFounder.name || !newFounder.description || !newFounder.image) {
      toast({
        title: "Missing Information",
        description: "Please provide name, description, and image.",
        variant: "destructive"
      });
      return;
    }

    const founderData = {
      id: Date.now().toString(),
      ...newFounder
    };

    dispatch({
      type: 'ADD_FOUNDER',
      payload: founderData
    });

    setNewFounder({ name: '', description: '', image: '' });
    toast({
      title: "Founder Added",
      description: "New founder has been added.",
    });
  };

  const handleEditFounder = (founder: any) => {
    setEditingFounder(founder.id);
    setEditFounderData({ name: founder.name, description: founder.description, image: founder.image });
  };

  const handleSaveFounderEdit = () => {
    if (!editFounderData.name || !editFounderData.description || !editFounderData.image) {
      toast({
        title: "Missing Information",
        description: "Please provide name, description, and image.",
        variant: "destructive"
      });
      return;
    }

    dispatch({
      type: 'UPDATE_FOUNDER',
      payload: { id: editingFounder, founder: editFounderData }
    });

    setEditingFounder(null);
    setEditFounderData({ name: '', description: '', image: '' });
    toast({
      title: "Founder Updated",
      description: "Founder has been updated successfully.",
    });
  };

  const handleDeleteFounder = (id: string) => {
    dispatch({
      type: 'DELETE_FOUNDER',
      payload: id
    });
    toast({
      title: "Founder Deleted",
      description: "Founder has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
        <Button onClick={handleSave} className="bg-school-blue hover:bg-school-blue/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* School Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>School Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUpload
              label="School Logo"
              currentImage={formData.schoolLogo}
              onImageUpload={(url) => handleImageUpload('schoolLogo', url)}
            />
            
            <div>
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                placeholder="Enter school name"
              />
            </div>
            
            <div>
              <Label htmlFor="yearEstablished">Year Established</Label>
              <Input
                id="yearEstablished"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="educationalSociety">Educational Society</Label>
              <Textarea
                id="educationalSociety"
                name="educationalSociety"
                value={formData.educationalSociety}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                name="welcomeMessage"
                value={formData.welcomeMessage}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            
            <ImageUpload
              label="Welcome Image"
              currentImage={formData.welcomeImage}
              onImageUpload={(url) => handleImageUpload('welcomeImage', url)}
            />
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About Us Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="schoolHistory">School History</Label>
              <Textarea
                id="schoolHistory"
                name="schoolHistory"
                value={formData.schoolHistory}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Latest Updates Management */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New Update */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-3">Add New Update</h4>
              <div className="space-y-3">
                <Textarea
                  value={newUpdate.content}
                  onChange={(e) => setNewUpdate({ content: e.target.value })}
                  placeholder="Enter update content"
                  rows={2}
                />
                <Button onClick={handleAddUpdate} size="sm" className="bg-school-blue hover:bg-school-blue/90">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Update
                </Button>
              </div>
            </div>

            {/* Current Updates */}
            <div className="space-y-3">
              {state.data.latestUpdates.map((update) => (
                <div key={update.id} className="border rounded-lg p-3">
                  {editingUpdate === update.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editUpdateData.content}
                        onChange={(e) => setEditUpdateData({ content: e.target.value })}
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveUpdateEdit} size="sm" className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={() => setEditingUpdate(null)} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-700">{update.content}</p>
                        <p className="text-sm text-gray-500 mt-1">Posted on {update.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUpdate(update)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUpdate(update.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Founders Management */}
        <Card>
          <CardHeader>
            <CardTitle>Founders Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New Founder */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-3">Add New Founder</h4>
              <div className="space-y-3">
                <Input
                  value={newFounder.name}
                  onChange={(e) => setNewFounder(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Founder name"
                />
                <Textarea
                  value={newFounder.description}
                  onChange={(e) => setNewFounder(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Founder description"
                  rows={3}
                />
                <ImageUpload
                  label="Founder Image"
                  currentImage={newFounder.image}
                  onImageUpload={(url) => setNewFounder(prev => ({ ...prev, image: url }))}
                />
                <Button onClick={handleAddFounder} size="sm" className="bg-school-blue hover:bg-school-blue/90">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Founder
                </Button>
              </div>
            </div>

            {/* Current Founders */}
            <div className="space-y-4">
              {founderDetails.length > 0 ? (
                founderDetails.map((founder) => (
                  <div key={founder.id} className="border rounded-lg p-4">
                    {editingFounder === founder.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editFounderData.name}
                          onChange={(e) => setEditFounderData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Founder name"
                        />
                        <Textarea
                          value={editFounderData.description}
                          onChange={(e) => setEditFounderData(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                        <ImageUpload
                          label="Founder Image"
                          currentImage={editFounderData.image}
                          onImageUpload={(url) => setEditFounderData(prev => ({ ...prev, image: url }))}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveFounderEdit} size="sm" className="bg-green-600 hover:bg-green-700">
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button onClick={() => setEditingFounder(null)} variant="outline" size="sm">
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4 flex-1">
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{founder.name}</h3>
                            <p className="text-gray-600 mt-1">{founder.description}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditFounder(founder)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteFounder(founder.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No founders added yet. Add your first founder above.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentManager;
