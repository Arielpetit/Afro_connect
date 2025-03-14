/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6666'];

export const StatsCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
    <h3 className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">{title}</h3>
    <p className="text-xl md:text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export const StatsGrid = ({ stats }: { stats: any }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 mb-6 md:mb-8">
    <StatsCard title="Total Accounts" value={stats.totalAccounts || 0} />
    <StatsCard title="Active Professionals" value={stats.totalUsers || 0} />
    <StatsCard title="Website Visits" value={stats.totalVisits || 0} />
    <StatsCard title="New This Week" value={stats.newThisWeek || 0} />
    <StatsCard title="Avg Experience (Years)" value={stats.averageExperience || 0} />
    <StatsCard title="Avg Projects Completed" value={stats.averageProjects || 0} />
  </div>
);

export const RegistrationChart = ({ data }: { data: any[] }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Registrations Last 7 Days</h3>
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const ExpertiseChart = ({ data }: { data: any[] }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Expertise Distribution</h3>
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="40%"
            outerRadius="60%"
            paddingAngle={5}
            dataKey="value"
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const CoverageChart = ({ data }: { data: any[] }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Coverage Zones</h3>
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="zone" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);