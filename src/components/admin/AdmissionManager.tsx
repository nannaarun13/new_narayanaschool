
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, Eye, Trash2 } from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';
import { exportToExcel } from '@/utils/excelExport';

const AdmissionManager = () => {
  const { toast } = useToast();
  const { state, dispatch } = useSchool();
  const admissions = state.data.admissionInquiries;

  const handleExportToExcel = () => {
    if (admissions.length === 0) {
      toast({
        title: "No Data",
        description: "No admission inquiries to export.",
        variant: "destructive"
      });
      return;
    }

    // Prepare data for export
    const exportData = admissions.map(admission => ({
      'Student Name': admission.studentName,
      'Class Applied': admission.classApplied,
      'Present Class': admission.presentClass,
      'Previous School': admission.previousSchool,
      'Father Name': admission.fatherName,
      'Mother Name': admission.motherName,
      'Primary Contact': admission.primaryContact,
      'Secondary Contact': admission.secondaryContact,
      'Location': admission.location,
      'Additional Info': admission.additionalInfo,
      'Submitted Date': admission.submittedDate
    }));

    exportToExcel(exportData, 'admission-inquiries');
    
    toast({
      title: "Export Successful",
      description: "Admission data has been downloaded as CSV file.",
    });
  };

  const handleDeleteInquiry = (id: string) => {
    dispatch({
      type: 'DELETE_ADMISSION_INQUIRY',
      payload: id
    });
    toast({
      title: "Inquiry Deleted",
      description: "Admission inquiry has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Admission Management</h2>
        <Button onClick={handleExportToExcel} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-school-blue">{admissions.length}</p>
              <p className="text-sm text-gray-600">Total Inquiries</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-school-orange">
                {admissions.filter(a => {
                  const submittedDate = new Date(a.submittedDate);
                  const today = new Date();
                  const diffTime = Math.abs(today.getTime() - submittedDate.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {admissions.filter(a => {
                  const submittedDate = new Date(a.submittedDate);
                  const today = new Date();
                  const diffTime = Math.abs(today.getTime() - submittedDate.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 30;
                }).length}
              </p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admission List */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {admissions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No admission inquiries yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {admissions.map((admission) => (
                <div key={admission.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">{admission.studentName}</h3>
                        <Badge className="bg-school-blue text-white">
                          New
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Class Applied:</strong> {admission.classApplied}</p>
                          <p><strong>Present Class:</strong> {admission.presentClass || 'N/A'}</p>
                          <p><strong>Previous School:</strong> {admission.previousSchool || 'N/A'}</p>
                        </div>
                        <div>
                          <p><strong>Father:</strong> {admission.fatherName}</p>
                          <p><strong>Mother:</strong> {admission.motherName || 'N/A'}</p>
                          <p><strong>Primary Contact:</strong> {admission.primaryContact}</p>
                          {admission.secondaryContact && (
                            <p><strong>Secondary Contact:</strong> {admission.secondaryContact}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {admission.location && (
                          <p><strong>Location:</strong> {admission.location}</p>
                        )}
                        <p><strong>Submitted:</strong> {admission.submittedDate}</p>
                      </div>
                      {admission.additionalInfo && (
                        <div className="text-sm">
                          <strong>Additional Info:</strong> {admission.additionalInfo}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteInquiry(admission.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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

export default AdmissionManager;
