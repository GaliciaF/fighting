import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomManagement from "./pages/RoomManagement";
import Tenants from "./pages/Tenants";
import AddTenant from "./pages/AddTenant";
import AddRoom from "./pages/AddRoom";
import Payments from "./pages/Payments";
import AddPayment from "./pages/AddPayment";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Announcements from "./pages/Announcements";
import UserAnnouncements from "./pages/UserAnnouncements";
// Staff-specific pages
import StaffDashboard from "./pages/StaffDashboard";
import StaffRoomManagement from "./pages/StaffRoomManagement";
import StaffTenants from "./pages/StaffTenants";
import StaffAddRoom from "./pages/StaffAddRoom";
import StaffAddTenant from "./pages/StaffAddTenant";

// Role-based route guard
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
  path="/announcements"
  element={
    <ProtectedRoute allowedRole="admin">
      <Announcements />
    </ProtectedRoute>
  }
/>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roommanagement"
        element={
          <ProtectedRoute allowedRole="admin">
            <RoomManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenants"
        element={
          <ProtectedRoute allowedRole="admin">
            <Tenants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute allowedRole="admin">
            <Payments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addpayment"
        element={
          <ProtectedRoute allowedRole="admin">
            <AddPayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addtenant"
        element={
          <ProtectedRoute allowedRole="admin">
            <AddTenant />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addroom"
        element={
          <ProtectedRoute allowedRole="admin">
            <AddRoom />
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
  path="/user/announcements"
  element={
    <ProtectedRoute allowedRole="user">
      <UserAnnouncements />
    </ProtectedRoute>
  }
/>

      {/* Staff Routes */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/rooms"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffRoomManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/tenants"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffTenants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/add-room"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffAddRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/add-tenant"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffAddTenant />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
