
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Image, 
  Bell, 
  FileText, 
  Phone,
  Shield,
  Home,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useSchool } from '@/contexts/SchoolContext';
import ContentManager from '@/components/admin/ContentManager';
import GalleryManager from '@/components/admin/GalleryManager';
import NoticeManager from '@/components/admin/NoticeManager';
import AdmissionManager from '@/components/admin/AdmissionManager';
import ContactManager from '@/components/admin/ContactManager';
import AdminApprovalManager from '@/components/admin/AdminApprovalManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state, dispatch } = useSchool();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [pageVisits] = useState(Math.floor(Math.random() * 1000) + 500);

  useEffect(() => {
    // Check for admin credentials first
    const adminEmail = localStorage.getItem('adminEmail');
    const adminPassword = localStorage.getItem('adminPassword');
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (adminEmail === 'arunnanna3@gmail.com' && adminPassword === 'Arun@2004' && adminLoggedIn === 'true') {
      setIsAdminLoggedIn(true);
      setUser({ email: adminEmail, displayName: 'Admin' });
      setLoading(false);
      return;
    }

    // Check Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdminLoggedIn(true);
      } else {
        // No user authenticated, redirect to login
        navigate('/login', { replace: true });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Simulate page visits counter
  useEffect(() => {
    dispatch({
      type: 'UPDATE_SCHOOL_DATA',
      payload: { pageVisits }
    });
  }, [dispatch, pageVisits]);

  const handleLogout = async () => {
    try {
      // Clear admin credentials
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminPassword');
      localStorage.removeItem('adminLoggedIn');
      
      // Sign out from Firebase if applicable
      if (auth.currentUser) {
        await signOut(auth);
      }
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/login', { replace: true });
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "An error occurred while logging out.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-16 w-16 text-school-blue mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Access denied. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    { 
      title: "Total Inquiries", 
      value: state.data.admissionInquiries.length.toString(), 
      icon: Users, 
      color: "text-school-blue" 
    },
    { 
      title: "Gallery Images", 
      value: state.data.galleryImages.length.toString(), 
      icon: Image, 
      color: "text-school-orange" 
    },
    { 
      title: "Active Notices", 
      value: state.data.notices.length.toString(), 
      icon: Bell, 
      color: "text-green-600" 
    },
    { 
      title: "Page Visits", 
      value: pageVisits.toString(), 
      icon: FileText, 
      color: "text-purple-600" 
    }
  ];

  const handleActivityClick = (activity: string) => {
    switch (activity) {
      case 'admission':
        setActiveTab('admissions');
        break;
      case 'gallery':
        setActiveTab('gallery');
        break;
      case 'notice':
        setActiveTab('notices');
        break;
      case 'approval':
        setActiveTab('admin-approval');
        break;
      default:
        break;
    }
  };

  const pendingRequests = state.data.adminRequests?.filter(req => req.status === 'pending').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-school-blue" />
              <div>
                <h1 className="text-2xl font-bold text-school-blue">Admin Dashboard</h1>
                <p className="text-gray-600">New Narayana School Management</p>
                {user && (
                  <p className="text-sm text-gray-500">Welcome, {user.displayName || user.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-school-blue text-school-blue hover:bg-school-blue hover:text-white"
              >
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="admin-approval" className="relative">
              Admin Approval
              {pendingRequests > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingRequests}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Dashboard Stats */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-12 w-12 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div 
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => handleActivityClick('admission')}
                    >
                      <Bell className="h-5 w-5 text-school-blue" />
                      <div>
                        <p className="font-medium">New admission inquiry received</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <div 
                      className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                      onClick={() => handleActivityClick('gallery')}
                    >
                      <Image className="h-5 w-5 text-school-orange" />
                      <div>
                        <p className="font-medium">Gallery updated with new images</p>
                        <p className="text-sm text-gray-600">5 hours ago</p>
                      </div>
                    </div>
                    <div 
                      className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                      onClick={() => handleActivityClick('notice')}
                    >
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Notice board updated</p>
                        <p className="text-sm text-gray-600">1 day ago</p>
                      </div>
                    </div>
                    {pendingRequests > 0 && (
                      <div 
                        className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                        onClick={() => handleActivityClick('approval')}
                      >
                        <UserCheck className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">{pendingRequests} admin access request(s) pending</p>
                          <p className="text-sm text-gray-600">Requires your attention</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="notices">
            <NoticeManager />
          </TabsContent>

          <TabsContent value="admissions">
            <AdmissionManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>

          <TabsContent value="admin-approval">
            <AdminApprovalManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
