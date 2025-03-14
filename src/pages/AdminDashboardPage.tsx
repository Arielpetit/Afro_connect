/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/AdminDashboard/Sidebar";
import { PendingApprovalsTable } from "../components/AdminDashboard/PendingApprovalsTable";
import { ProfessionalsTable } from "../components/AdminDashboard/ProfessionalsTable";
import { ResourcesTable } from "../components/AdminDashboard/ResourcesTable";
import ApprovalStatusChart from "../components/AdminDashboard/ApprovalStatusChart";
import { StatsGrid, RegistrationChart, ExpertiseChart, CoverageChart } from "../components/AdminDashboard/StatsGrid";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<any>({});
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<any[]>([]);
  const [totalAccounts, setTotalAccounts] = useState<number>(0);

  useEffect(() => {
    const fetchTotalAccounts = async () => {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const usersResult = await getDocs(collection(db, "users"));
            setTotalAccounts(usersResult.size);
          }
        });
      } catch (error) {
        console.error("Error fetching total accounts:", error);
        toast.error("Failed to fetch total accounts.");
      }
    };
    const fetchData = async () => {
      try {
        // Fetch users
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Separate pending and approved users
        const pending = usersList.filter(user => user.status === 'pending');
        const approved = usersList.filter(user => user.status !== 'pending');
        setPendingUsers(pending);
        setApprovedUsers(approved);

        // Calculate registration data
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
        setResources(resourcesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })));

        // Calculate expertise distribution
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

        // Calculate coverage zones
        const coverageData = [
          "Alberta", "Colombie-Britannique", "Île-du-Prince-Édouard",
          "Manitoba", "Nouveau-Brunswick", "Nouvelle-Écosse", "Nunavut",
          "Ontario", "Québec", "Saskatchewan", "Terre-Neuve-et-Labrador",
          "Territoires du Nord-Ouest", "Yukon"
        ].map(zone => ({
          zone,
          count: usersList.filter(user => user.coverageZone === zone).length
        }));

        // Calculate statistics
        const totalExperience = approved.reduce((sum, user) => sum + (Number(user.experience) || 0), 0);
        const totalProjects = approved.reduce((sum, user) => sum + (Number(user.projectsCompleted) || 0), 0);

        setStats({
          totalAccounts,
          totalUsers: approved.length,
          newThisWeek: approved.filter(user => 
            new Date(user.createdAt?.seconds * 1000).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
          ).length,
          averageExperience: approved.length ? (totalExperience / approved.length).toFixed(1) : 0,
          averageProjects: approved.length ? (totalProjects / approved.length).toFixed(1) : 0,
          registrationData,
          expertiseData,
          coverageData
        });

      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error("Failed to load data");
      }
    };
    
    fetchData();
    fetchTotalAccounts();
  },[totalAccounts]);

  const handleRowClick = (userId: string) => {
    navigate(`/profile/${userId}`, { 
      state: { 
        fromAdmin: true,
        userId: userId 
      } 
    });
  };

  const handleApprove = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { status: 'approved' });
      
      const userToApprove = pendingUsers.find(user => user.id === userId);
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      setApprovedUsers([...approvedUsers, userToApprove]);
      
      toast.success("Professional approved successfully");
    } catch (error) {
      console.error("Error approving professional: ", error);
      toast.error("Failed to approve professional");
    }
  };

  const handleDeleteUser = async (userId: string, isApproved: boolean) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      
      if (isApproved) {
        setApprovedUsers(approvedUsers.filter(user => user.id !== userId));
      } else {
        setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      }
      
      toast.success("Professional deleted successfully");
    } catch (error) {
      console.error("Error deleting professional: ", error);
      toast.error("Failed to delete professional");
    }
  };

  const handleEditResource = (resourceId: string) => {
    navigate(`/edit-resource/${resourceId}`);
  };

  const handleDeleteResource = async (resourceId: string) => {
    try {
      await deleteDoc(doc(db, "resources", resourceId));
      setResources(resources.filter(resource => resource.id !== resourceId));
      toast.success("Resource deleted successfully");
    } catch (error) {
      console.error("Error deleting resource: ", error);
      toast.error("Failed to delete resource");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <StatsGrid stats={stats} />
          
          <div className="grid md:grid-cols-2 gap-3 md:gap-6 mb-8">
            <div className="chart-container">
              <RegistrationChart data={stats.registrationData || []} />
            </div>
            <div className="chart-container">
              <ExpertiseChart data={stats.expertiseData || []} />
            </div>
            <div className="chart-container">
              <CoverageChart data={stats.coverageData || []} />
            </div>
              <ApprovalStatusChart 
                approved={approvedUsers.length} 
                pending={pendingUsers.length} 
              />
           
          </div>

          <div className="overflow-x-auto mb-8">
            <ProfessionalsTable
              users={approvedUsers}
              onDelete={(userId) => handleDeleteUser(userId, true)}
              onRowClick={handleRowClick}
            />
          </div>

          {pendingUsers.length > 0 && (
            <div className="overflow-x-auto mb-8">
              <PendingApprovalsTable
                users={pendingUsers}
                onApprove={handleApprove}
                onDelete={(userId) => handleDeleteUser(userId, false)}
                onRowClick={handleRowClick}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <ResourcesTable
              resources={resources}
              onEdit={handleEditResource}
              onDelete={handleDeleteResource}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;