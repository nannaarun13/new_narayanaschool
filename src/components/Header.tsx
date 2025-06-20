
import { useSchool } from '@/contexts/SchoolContext';

const Header = () => {
  const { state } = useSchool();
  const { schoolName, schoolLogo, schoolNameImage } = state.data;

  return (
    <header className="school-gradient text-white shadow-lg">
      {/* Main Header */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <img 
              src={schoolLogo} 
              alt="School Logo" 
              className="h-16 w-16 object-contain bg-white rounded-full p-1"
            />
            <div className="text-center">
              {schoolNameImage ? (
                <img
                  src={schoolNameImage}
                  alt="School Name"
                  className="max-h-16 object-contain mx-auto"
                />
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                  {schoolName}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
