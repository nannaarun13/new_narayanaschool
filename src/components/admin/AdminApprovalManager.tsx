
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, X, User } from 'lucide-react';

const AdminApprovalManager = () => {
  const { toast } = useToast();
  const [adminRequests, setAdminRequests] = useState<any[]>([]);

  useEffect(() => {
    loadAdminRequests();
  }, []);

  const loadAdminRequests = () => {
    const requests = JSON.parse(localStorage.getItem('adminRequests') || '[]');
    setAdminRequests(requests.filter((req: any) => req.status === 'pending'));
  };

  const handleApprove = (requestId: string) => {
    const allRequests = JSON.parse(localStorage.getItem('adminRequests') || '[]');
    const updatedRequests = allRequests.map((req: any) => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    );
    localStorage.setItem('adminRequests', JSON.stringify(updatedRequests));
    
    // Add to approved admins
    const approvedAdmins = JSON.parse(localStorage.getItem('approvedAdmins') || '[]');
    const request = allRequests.find((req: any) => req.id === requestId);
    if (request) {
      approvedAdmins.push({
        email: request.email,
        password: request.password,
        name: `${request.firstName} ${request.lastName}`,
        phone: request.phone,
        approvedDate: new Date().toISOString().split('T')[0]
      });
      localStorage.setItem('approvedAdmins', JSON.stringify(approvedAdmins));
    }
    
    loadAdminRequests();
    toast({
      title: "Admin Approved",
      description: "Admin access has been granted successfully.",
    });
  };

  const handleReject = (requestId: string) => {
    const allRequests = JSON.parse(localStorage.getItem('adminRequests') || '[]');
    const updatedRequests = allRequests.map((req: any) => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    );
    localStorage.setItem('adminRequests', JSON.stringify(updatedRequests));
    
    loadAdminRequests();
    toast({
      title: "Request Rejected",
      description: "Admin request has been rejected.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Admin Access Requests</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Pending Requests ({adminRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {adminRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending admin requests</p>
          ) : (
            <div className="space-y-4">
              {adminRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">
                        {request.firstName} {request.lastName}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Email:</strong> {request.email}</p>
                        <p><strong>Phone:</strong> {request.phone}</p>
                        <p><strong>Requested on:</strong> {request.requestDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApprovalManager;
