
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface SchoolData {
  schoolName: string;
  schoolLogo: string;
  schoolNameImage?: string;
  welcomeMessage: string;
  welcomeImage: string;
  latestUpdates: Array<{
    id: string;
    content: string;
    date: string;
  }>;
  schoolHistory: string;
  yearEstablished: string;
  educationalSociety: string;
  founderDetails: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
  }>;
  contactInfo: {
    address: string;
    email: string;
    phone: string;
    phoneNumbers: string[];
    mapEmbed: string;
  };
  navigationItems: Array<{
    name: string;
    path: string;
    visible: boolean;
  }>;
  notices: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
  }>;
  galleryImages: Array<{
    id: string;
    url: string;
    caption: string;
    category: string;
    date: string;
  }>;
  admissionInquiries: Array<{
    id: string;
    studentName: string;
    classApplied: string;
    presentClass: string;
    previousSchool: string;
    fatherName: string;
    motherName: string;
    primaryContact: string;
    secondaryContact: string;
    location: string;
    additionalInfo: string;
    submittedDate: string;
  }>;
  adminRequests?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    requestDate: string;
    status: 'pending' | 'approved' | 'rejected';
  }>;
  pageVisits?: number;
}

interface SchoolState {
  data: SchoolData;
  isAdmin: boolean;
  currentUser: any;
}

const initialState: SchoolState = {
  data: {
    schoolName: "New Narayana School",
    schoolLogo: "/placeholder.svg",
    welcomeMessage: "Welcome to New Narayana School - Nurturing Excellence in Education",
    welcomeImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    latestUpdates: [
      {
        id: "1",
        content: "Admission Open for Academic Year 2024-25",
        date: "2024-01-15"
      },
      {
        id: "2", 
        content: "Annual Sports Day scheduled for December 15th",
        date: "2024-01-14"
      },
      {
        id: "3",
        content: "Parent-Teacher Meeting on November 30th",
        date: "2024-01-13"
      }
    ],
    schoolHistory: "Established in 2023, New Narayana School has been a beacon of quality education, fostering academic excellence and character development.",
    yearEstablished: "2023",
    educationalSociety: "Narayana Educational Society has been dedicated to promoting quality education and holistic development of students across the region.",
    founderDetails: [
      {
        id: "1",
        name: "Dr. P. Narayana",
        description: "Founded with a vision to provide world-class education accessible to all.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    ],
    contactInfo: {
      address: "8G49+HFJ, Sri Laxmi Nagar Colony, Badangpet, Hyderabad, Telangana 500058",
      email: "info@newnarayanaschool.edu",
      phone: "+91 98765 43210",
      phoneNumbers: ["+91 98765 43210"],
      mapEmbed: "https://www.google.com/maps/embed/v1/search?q=8G49%2BHFJ%2C%20Sri%20Laxmi%20Nagar%20Colony%2C%20Badangpet%2C%20Hyderabad%2C%20Telangana%20500058&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
    },
    navigationItems: [
      { name: "Home", path: "/", visible: true },
      { name: "About Us", path: "/about", visible: true },
      { name: "Admissions", path: "/admissions", visible: true },
      { name: "Gallery", path: "/gallery", visible: true },
      { name: "Notice Board", path: "/notice-board", visible: true },
      { name: "Contact Us", path: "/contact", visible: true },
      { name: "Login", path: "/login", visible: true }
    ],
    notices: [
      {
        id: "1",
        title: "Admission Open",
        content: "Admissions are now open for the academic year 2024-25. Please visit the admissions office for more details.",
        date: "2024-01-15"
      }
    ],
    galleryImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
        caption: "School Building",
        category: "general",
        date: "2024-01-01"
      }
    ],
    admissionInquiries: [],
    adminRequests: [],
    pageVisits: 0
  },
  isAdmin: false,
  currentUser: null
};

type SchoolAction = 
  | { type: 'UPDATE_SCHOOL_DATA'; payload: Partial<SchoolData> }
  | { type: 'SET_ADMIN'; payload: { isAdmin: boolean; user: any } }
  | { type: 'ADD_NOTICE'; payload: any }
  | { type: 'UPDATE_NOTICE'; payload: { id: string; notice: any } }
  | { type: 'DELETE_NOTICE'; payload: string }
  | { type: 'ADD_GALLERY_IMAGE'; payload: any }
  | { type: 'DELETE_GALLERY_IMAGE'; payload: string }
  | { type: 'ADD_ADMISSION_INQUIRY'; payload: any }
  | { type: 'DELETE_ADMISSION_INQUIRY'; payload: string }
  | { type: 'ADD_LATEST_UPDATE'; payload: any }
  | { type: 'UPDATE_LATEST_UPDATE'; payload: { id: string; update: any } }
  | { type: 'DELETE_LATEST_UPDATE'; payload: string }
  | { type: 'ADD_FOUNDER'; payload: any }
  | { type: 'UPDATE_FOUNDER'; payload: { id: string; founder: any } }
  | { type: 'DELETE_FOUNDER'; payload: string }
  | { type: 'ADD_ADMIN_REQUEST'; payload: any }
  | { type: 'UPDATE_ADMIN_REQUEST'; payload: { id: string; status: 'pending' | 'approved' | 'rejected' } }
  | { type: 'LOAD_PERSISTED_DATA'; payload: SchoolData }
  | { type: 'CLEANUP_OLD_INQUIRIES' };

function schoolReducer(state: SchoolState, action: SchoolAction): SchoolState {
  let newState: SchoolState;
  
  switch (action.type) {
    case 'LOAD_PERSISTED_DATA':
      newState = {
        ...state,
        data: { ...state.data, ...action.payload }
      };
      break;
    case 'UPDATE_SCHOOL_DATA':
      newState = {
        ...state,
        data: { ...state.data, ...action.payload }
      };
      break;
    case 'SET_ADMIN':
      newState = {
        ...state,
        isAdmin: action.payload.isAdmin,
        currentUser: action.payload.user
      };
      break;
    case 'ADD_NOTICE':
      newState = {
        ...state,
        data: {
          ...state.data,
          notices: [action.payload, ...state.data.notices]
        }
      };
      break;
    case 'UPDATE_NOTICE':
      newState = {
        ...state,
        data: {
          ...state.data,
          notices: state.data.notices.map(notice =>
            notice.id === action.payload.id ? { ...notice, ...action.payload.notice } : notice
          )
        }
      };
      break;
    case 'DELETE_NOTICE':
      newState = {
        ...state,
        data: {
          ...state.data,
          notices: state.data.notices.filter(notice => notice.id !== action.payload)
        }
      };
      break;
    case 'ADD_GALLERY_IMAGE':
      newState = {
        ...state,
        data: {
          ...state.data,
          galleryImages: [action.payload, ...state.data.galleryImages]
        }
      };
      break;
    case 'DELETE_GALLERY_IMAGE':
      newState = {
        ...state,
        data: {
          ...state.data,
          galleryImages: state.data.galleryImages.filter(img => img.id !== action.payload)
        }
      };
      break;
    case 'ADD_ADMISSION_INQUIRY':
      newState = {
        ...state,
        data: {
          ...state.data,
          admissionInquiries: [action.payload, ...state.data.admissionInquiries]
        }
      };
      break;
    case 'DELETE_ADMISSION_INQUIRY':
      newState = {
        ...state,
        data: {
          ...state.data,
          admissionInquiries: state.data.admissionInquiries.filter(inquiry => inquiry.id !== action.payload)
        }
      };
      break;
    case 'ADD_LATEST_UPDATE':
      newState = {
        ...state,
        data: {
          ...state.data,
          latestUpdates: [action.payload, ...state.data.latestUpdates]
        }
      };
      break;
    case 'UPDATE_LATEST_UPDATE':
      newState = {
        ...state,
        data: {
          ...state.data,
          latestUpdates: state.data.latestUpdates.map(update =>
            update.id === action.payload.id ? { ...update, ...action.payload.update } : update
          )
        }
      };
      break;
    case 'DELETE_LATEST_UPDATE':
      newState = {
        ...state,
        data: {
          ...state.data,
          latestUpdates: state.data.latestUpdates.filter(update => update.id !== action.payload)
        }
      };
      break;
    case 'ADD_FOUNDER':
      newState = {
        ...state,
        data: {
          ...state.data,
          founderDetails: [action.payload, ...state.data.founderDetails]
        }
      };
      break;
    case 'UPDATE_FOUNDER':
      newState = {
        ...state,
        data: {
          ...state.data,
          founderDetails: state.data.founderDetails.map(founder =>
            founder.id === action.payload.id ? { ...founder, ...action.payload.founder } : founder
          )
        }
      };
      break;
    case 'DELETE_FOUNDER':
      newState = {
        ...state,
        data: {
          ...state.data,
          founderDetails: state.data.founderDetails.filter(founder => founder.id !== action.payload)
        }
      };
      break;
    case 'ADD_ADMIN_REQUEST':
      newState = {
        ...state,
        data: {
          ...state.data,
          adminRequests: [action.payload, ...(state.data.adminRequests || [])]
        }
      };
      break;
    case 'UPDATE_ADMIN_REQUEST':
      newState = {
        ...state,
        data: {
          ...state.data,
          adminRequests: (state.data.adminRequests || []).map(request =>
            request.id === action.payload.id ? { ...request, status: action.payload.status } : request
          )
        }
      };
      break;
    case 'CLEANUP_OLD_INQUIRIES':
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      newState = {
        ...state,
        data: {
          ...state.data,
          admissionInquiries: state.data.admissionInquiries.filter(inquiry => {
            const inquiryDate = new Date(inquiry.submittedDate);
            return inquiryDate > sixMonthsAgo;
          })
        }
      };
      break;
    default:
      return state;
  }

  // Persist to localStorage
  localStorage.setItem('schoolData', JSON.stringify(newState.data));
  return newState;
}

const SchoolContext = createContext<{
  state: SchoolState;
  dispatch: React.Dispatch<SchoolAction>;
} | null>(null);

export function SchoolContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(schoolReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    try {
      const persistedData = localStorage.getItem('schoolData');
      if (persistedData) {
        const parsedData = JSON.parse(persistedData);
        dispatch({ type: 'LOAD_PERSISTED_DATA', payload: parsedData });
      }
    } catch (error) {
      console.error('Error loading persisted data:', error);
    }

    // Cleanup old inquiries on mount
    dispatch({ type: 'CLEANUP_OLD_INQUIRIES' });
  }, []);

  // Auto-cleanup old inquiries daily
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'CLEANUP_OLD_INQUIRIES' });
    }, 24 * 60 * 60 * 1000); // Run daily

    return () => clearInterval(interval);
  }, []);

  return (
    <SchoolContext.Provider value={{ state, dispatch }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolContextProvider');
  }
  return context;
}
