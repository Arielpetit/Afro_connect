import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { User, ShieldCheck, Clock, CalendarDays, MailCheck, LogOut } from 'lucide-react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [professionalData, setProfessionalData] = useState<any>(null);
  const [loadingProfessional, setLoadingProfessional] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/signup');
      } else {
        // Fetch professional data
        const db = getFirestore();
        const q = query(collection(db, 'users'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setProfessionalData(querySnapshot.docs[0].data());
        }
        setLoadingProfessional(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-blue-700 flex items-center justify-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user.displayName || 'Welcome User'}
                  </h1>
                  <p className="text-blue-100">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-5 w-5 text-white" />
                <span className="text-white font-medium">Log Out</span>
              </button>
            </div>
          </div>

          {/* Account Details */}
          <div className="px-6 py-8 space-y-8">
            {/* Account Status Section */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-blue-900 mb-4">
                <ShieldCheck className="h-6 w-6 mr-2 text-blue-600" />
                Account Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                  <MailCheck className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email Verification</p>
                    <p className={`font-medium ${user.emailVerified ? 'text-green-600' : 'text-orange-600'}`}>
                      {user.emailVerified ? 'Verified' : 'Pending Verification'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">
                      {new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Professional Status</p>
                    {loadingProfessional ? (
                      <p className="font-medium text-gray-500">Loading...</p>
                    ) : (
                      <>
                        <p className={`font-medium ${
                          professionalData?.status === 'pending' ? 'text-orange-600' :
                          professionalData?.status === 'approved' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {professionalData ? 
                            (professionalData.status === 'pending' ? 'Pending Approval' : 
                             professionalData.status === 'approved' ? 'Approved' : 'Not Registered') 
                            : 'Not Registered'}
                        </p>
                        {professionalData?.status === 'pending' || professionalData?.status === 'approved' && (
                          <button
                            onClick={() => navigate('/register', { state: { editMode: true, existingData: professionalData } })}
                            className="text-blue-600 text-sm mt-1 hover:underline"
                          >
                            Edit Registration
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of the components remain the same */}
            {/* Activity Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <Clock className="h-6 w-6 mr-2 text-gray-600" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Last Sign In</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.metadata.lastSignInTime).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-red-50 rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-red-900 mb-4">
                <ShieldCheck className="h-6 w-6 mr-2 text-red-600" />
                Security
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-medium text-gray-900">••••••••</p>
                </div>
                <button className="w-full text-left bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <p className="text-sm text-gray-500">Two-Factor Authentication</p>
                  <p className="font-medium text-blue-600">Add extra security →</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}