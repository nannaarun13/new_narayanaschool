
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSchool } from '@/contexts/SchoolContext';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2 } from 'lucide-react';

const ContactManager = () => {
  const { state, dispatch } = useSchool();
  const { toast } = useToast();
  const [contactData, setContactData] = useState({
    ...state.data.contactInfo,
    phoneNumbers: state.data.contactInfo.phoneNumbers || [state.data.contactInfo.phone]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...contactData.phoneNumbers];
    newPhones[index] = value;
    setContactData(prev => ({ ...prev, phoneNumbers: newPhones }));
  };

  const addPhoneNumber = () => {
    if (contactData.phoneNumbers.length < 5) {
      setContactData(prev => ({ 
        ...prev, 
        phoneNumbers: [...prev.phoneNumbers, ''] 
      }));
    }
  };

  const removePhoneNumber = (index: number) => {
    if (contactData.phoneNumbers.length > 1) {
      const newPhones = contactData.phoneNumbers.filter((_, i) => i !== index);
      setContactData(prev => ({ ...prev, phoneNumbers: newPhones }));
    }
  };

  const handleSave = () => {
    // Filter out empty phone numbers
    const filteredPhones = contactData.phoneNumbers.filter(phone => phone.trim() !== '');
    
    const updatedContactInfo = {
      ...contactData,
      phoneNumbers: filteredPhones,
      phone: filteredPhones[0] || contactData.phone // Keep the first phone as primary
    };

    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: { contactInfo: updatedContactInfo }
    });
    
    toast({
      title: "Contact Information Updated",
      description: "Contact details have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Contact Management</h2>
        <Button onClick={handleSave} className="bg-school-blue hover:bg-school-blue/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">School Address</Label>
            <Textarea
              id="address"
              name="address"
              value={contactData.address}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={contactData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Phone Numbers</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPhoneNumber}
                disabled={contactData.phoneNumbers.length >= 5}
                className="text-school-blue border-school-blue hover:bg-school-blue hover:text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Phone
              </Button>
            </div>
            {contactData.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  placeholder={`Phone number ${index + 1}`}
                />
                {contactData.phoneNumbers.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removePhoneNumber(index)}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <p className="text-xs text-gray-500">You can add up to 5 phone numbers</p>
          </div>

          <div>
            <Label htmlFor="mapEmbed">Map Embed URL</Label>
            <Textarea
              id="mapEmbed"
              name="mapEmbed"
              value={contactData.mapEmbed}
              onChange={handleInputChange}
              rows={3}
              placeholder="Enter Google Maps embed URL"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;
