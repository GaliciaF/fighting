import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomManagement from "./pages/RoomManagement";
import Tenants from "./pages/Tenants";
import CleaningSchedule from "./pages/CleaningSchedule";
import AddTenant from "./pages/AddTenant";
import AddRoom from "./pages/AddRoom";
import Payments from "./pages/Payments";
import AddPayment from "./pages/AddPayment";
import AdminLayout from "./layout/AdminLayout";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// 🔒 Role-based route guards
const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("role");
  if (!role) return <Navigate to="/login" replace />;
  if (role !== allowedRole) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/roommanagement"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <RoomManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tenants"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Tenants />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cleaningschedule"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <CleaningSchedule />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Payments />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addpayment"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout hideSidebar>
                <AddPayment />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtenant"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout hideSidebar>
                <AddTenant />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addroom"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout hideSidebar>
                <AddRoom />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/payments"
          element={
            <ProtectedRoute allowedRole="user">
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/cleaning"
          element={
            <ProtectedRoute allowedRole="user">
              {/* You can render a UserCleaningSchedule component here later */}
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
  );
}
