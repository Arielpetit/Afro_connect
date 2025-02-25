/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Sidebar from "../components/Sidebar";
const AdminDashboardPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<any[]>([]);


  const resourceCategories = [
    { id: 'market-trends', name: 'Market Trends' },
    { id: 'buying-guides', name: 'Buying Guides' },
    { id: 'legal-advice', name: 'Legal Advice' },
    { id: 'investment-strategies', name: 'Investment Strategies' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6666'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        const pending = usersList.filter(user => user.status === 'pending');
        const approved = usersList.filter(user => user.status === 'approved' || !user.status);
        setUsers(approved);
        
        setPendingUsers(pending);
        setApprovedUsers(approved);

        // Update stats calculations with approved users
        const registrationData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return {
            date: date.toLocaleDateString('en-US', { weekday: 'short' }),
            count: approved.filter(user => 
              new Date(user.createdAt?.seconds * 1000).toDateString() === date.toDateString()
            ).length
          };
        }).reverse();

        // Fetch resources
        const resourcesSnapshot = await getDocs(collection(db, "resources"));
        const resourcesList = resourcesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setResources(resourcesList);
        

        const expertiseData = [
            "Courtier hypothécaire",
            "Agent immobilier",
            "Notaire",
            "Inspecteur en bâtiment",
            "Opérateur agréé",
            "Entreprise de déménagement",
            "Entrepreneur général",
            "Autre (préciser)"
        ].map(expertise => ({
            name: expertise,
            value: usersList.filter(user => user.expertise === expertise).length
        }));

        const coverageData = [
            "Alberta", "Colombie-Britannique", "Île-du-Prince-Édouard",
            "Manitoba", "Nouveau-Brunswick", "Nouvelle-Écosse", "Nunavut",
            "Ontario", "Québec", "Saskatchewan", "Terre-Neuve-et-Labrador",
            "Territoires du Nord-Ouest", "Yukon"
        ].map(zone => ({
            zone,
            count: usersList.filter(user => user.coverageZone === zone).length
        }));

        const totalExperience = usersList.reduce((sum, user) => sum + (Number(user.experience) || 0), 0);
        const totalProjects = usersList.reduce((sum, user) => sum + (Number(user.projectsCompleted) || 0), 0);

        setStats({
            totalUsers: usersList.length,
            newThisWeek: usersList.filter(user => 
                new Date(user.createdAt?.seconds * 1000).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
            ).length,
            averageExperience: usersList.length ? (totalExperience / usersList.length).toFixed(1) : 0,
            averageProjects: usersList.length ? (totalProjects / usersList.length).toFixed(1) : 0,
            registrationData,
            expertiseData,
            coverageData
        });

      } catch (error) {
        console.error("Error fetching users: ", error);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);
  // Add resource submission handler
  const handleDelete = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Failed to delete user");
    }
  };
  const handleApprove = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { status: 'approved' });
      const userToApprove = pendingUsers.find(user => user.id === userId);
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      setApprovedUsers([...approvedUsers, userToApprove]);
      toast.success("User approved successfully");
    } catch (error) {
      console.error("Error approving user: ", error);
      toast.error("Failed to approve user");
    }
  };
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    try {
      await deleteDoc(doc(db, "resources", resourceId));
      toast.success("Resource deleted successfully");
      setResources(resources.filter((resource) => resource.id !== resourceId));
    } catch (error) {
      console.error("Error deleting resource: ", error);
      toast.error("Failed to delete resource");
    }
  };

  const handleEditResource = (resourceId: string) => {
    navigate(`/resource/${resourceId}`);
  };


  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm md:text-base"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Total Professionals</h3>
            <p className="text-xl md:text-3xl font-bold text-gray-800">{stats.totalUsers || 0}</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">New This Week</h3>
            <p className="text-xl md:text-3xl font-bold text-gray-800">{stats.newThisWeek || 0}</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Avg Experience (Years)</h3>
            <p className="text-xl md:text-3xl font-bold text-gray-800">{stats.averageExperience || 0}</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Avg Projects Completed</h3>
            <p className="text-xl md:text-3xl font-bold text-gray-800">{stats.averageProjects || 0}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Registrations Last 7 Days</h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.registrationData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Expertise Distribution</h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.expertiseData || []}
                    innerRadius="40%"
                    outerRadius="60%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.expertiseData?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Coverage Zones</h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.coverageData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" angle={-45} textAnchor="end" interval={0} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold mb-4">Professional Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-0">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exp.</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.name}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.expertise}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.coverageZone}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.experience} yrs</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.projectsCompleted}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 text-xs md:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
                {/* Pending Approvals Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
          <div className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold mb-4">Pending Approvals</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-0">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.name}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.expertise}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.coverageZone}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="text-green-600 hover:text-green-900 text-xs md:text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 text-xs md:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
          <div className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold mb-4">Resource Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-0">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resources.map((resource) => (
                    <tr key={resource.id}>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{resource.title}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                        {resourceCategories.find(c => c.id === resource.category)?.name}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{resource.source}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm space-x-3">
                        <button
                          onClick={() => handleEditResource(resource.id)}
                          className="text-blue-600 hover:text-blue-900 text-xs md:text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="text-red-600 hover:text-red-900 text-xs md:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;