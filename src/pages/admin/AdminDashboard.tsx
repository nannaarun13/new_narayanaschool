
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSchool } from '@/contexts/SchoolContext';
import { Users, FileText, Calendar, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const { state } = useSchool();
  const [pageVisits, setPageVisits] = useState(0);

  useEffect(() => {
    // Track page visits
    const visits = parseInt(localStorage.getItem('pageVisits') || '0');
    const newVisits = visits + 1;
    localStorage.setItem('pageVisits', newVisits.toString());
    setPageVisits(newVisits);
  }, []);

  const stats = [
    {
      title: 'Total Inquiries',
      value: state.data.admissionInquiries.length,
      icon: Users,
      color: 'text-school-blue',
      bgColor: 'bg-school-blue-light'
    },
    {
      title: 'Active Notices',
      value: state.data.notices.length,
      icon: FileText,
      color: 'text-school-orange',
      bgColor: 'bg-school-orange-light'
    },
    {
      title: 'Gallery Images',
      value: state.data.galleryImages.length,
      icon: Calendar,
      color: 'text-school-blue',
      bgColor: 'bg-school-blue-light'
    },
    {
      title: 'Page Updates',
      value: pageVisits,
      icon: Eye,
      color: 'text-school-orange',
      bgColor: 'bg-school-orange-light'
    }
  ];

  const recentInquiries = state.data.admissionInquiries.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Admission Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent inquiries</p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{inquiry.studentName}</p>
                      <p className="text-sm text-gray-600">Class: {inquiry.classApplied}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{inquiry.submittedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
          </CardHeader>
          <CardContent>
            {state.data.latestUpdates.slice(0, 5).length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent updates</p>
            ) : (
              <div className="space-y-4">
                {state.data.latestUpdates.slice(0, 5).map((update) => (
                  <div key={update.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{update.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
