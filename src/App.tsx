
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { SchoolContextProvider } from '@/contexts/SchoolContext';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Admissions from '@/pages/Admissions';
import Gallery from '@/pages/Gallery';
import NoticeBoard from '@/pages/NoticeBoard';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminRegistration from '@/pages/admin/AdminRegistration';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <SchoolContextProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin-registration" element={<AdminRegistration />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/*" element={
              <Layout>
                <div className="flex flex-col min-h-screen">
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/admissions" element={<Admissions />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/notice-board" element={<NoticeBoard />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Layout>
            } />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </SchoolContextProvider>
  );
}

export default App;
