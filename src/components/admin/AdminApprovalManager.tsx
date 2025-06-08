
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSchool } from '@/contexts/SchoolContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AdminApprovalManager = () => {
  const { state, dispatch } = useSchool();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleApproveRequest = async (requestId: string) => {
    setLoading(requestId);
    try {
      const request = state.data.adminRequests?.find(req => req.id === requestId);
      if (!request) {
        throw new Error('Request not found');
      }

      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, request.email, request.password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: `${request.firstName} ${request.lastName}`
      });

      // Store admin data in Firestore
      await setDoc(doc(db, 'admins', user.uid), {
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        role: 'admin',
        createdAt: new Date(),
        verified: true,
        approvedBy: 'arunnanna3@gmail.com'
      });

      // Send email verification
      await sendEmailVerification(user);

      // Update request status
      dispatch({
        type: 'UPDATE_ADMIN_REQUEST',
        payload: { id: requestId, status: 'approved' }
      });

      toast({
        title: "Request Approved",
        description: `Admin access granted to ${request.email}. User can now login with their credentials.`,
      });
    } catch (error: any) {
      console.error('Approval error:', error);
      let errorMessage = "Failed to approve the request. Please try again.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. User can login directly.";
        // Still mark as approved since user exists
        dispatch({
          type: 'UPDATE_ADMIN_REQUEST',
          payload: { id: requestId, status: 'approved' }
        });
      }
      
      toast({
        title: "Approval Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
    setLoading(null);
  };

  const handleRejectRequest = (requestId: string) => {
    dispatch({
      type: 'UPDATE_ADMIN_REQUEST',
      payload: { id: requestId, status: 'rejected' }
    });

    toast({
      title: "Request Rejected",
      description: "Admin access request has been rejected.",
      variant: "destructive"
    });
  };

  const pendingRequests = state.data.adminRequests?.filter(req => req.status === 'pending') || [];
  const processedRequests = state.data.adminRequests?.filter(req => req.status !== 'pending') || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Admin Access Requests</h2>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-orange-500" />
          <span className="text-sm text-gray-600">{pendingRequests.length} pending requests</span>
        </div>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <span>Pending Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 bg-orange-50">
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="font-semibold">{request.firstName} {request.lastName}</span>
                      </div>
                      <p className="text-sm text-gray-600">{request.email}</p>
                      <p className="text-sm text-gray-600">{request.phone}</p>
                      <p className="text-xs text-gray-500">Requested: {new Date(request.requestDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={() => handleApproveRequest(request.id)}
                        disabled={loading === request.id}
                        className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ opacity: loading === request.id ? 0.5 : 1 }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {loading === request.id ? 'Approving...' : 'Approve'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRejectRequest(request.id)}
                        disabled={loading === request.id}
                        className="border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ opacity: loading === request.id ? 0.5 : 1 }}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No pending requests</p>
          )}
        </CardContent>
      </Card>

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Decisions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processedRequests.slice(0, 10).map((request) => (
                <div key={request.id} className={`border rounded-lg p-3 ${
                  request.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{request.firstName} {request.lastName}</span>
                      <span className="text-sm text-gray-600 ml-2">({request.email})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {request.status === 'approved' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm capitalize ${
                        request.status === 'approved' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminApprovalManager;
