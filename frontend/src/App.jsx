import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import RoomManagement from "./pages/RoomManagement";
import Tenants from "./pages/Tenants";
import EditTenant from "./pages/EditTenant";
import AddTenant from "./pages/AddTenant";
import AddRoom from "./pages/AddRoom";
import Payments from "./pages/Payments";
import AddPayment from "./pages/AddPayment";
import Announcements from "./pages/Announcements";
import EditRoom from "./pages/EditRoom";
// User pages
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserPayments from "./pages/UserPayment";
import UserAnnouncements from "./pages/UserAnnouncements";

// Staff pages
import StaffDashboard from "./pages/StaffDashboard";
import StaffRoomManagement from "./pages/StaffRoomManagement";
import StaffTenants from "./pages/StaffTenants";
import StaffAddRoom from "./pages/StaffAddRoom";
import StaffAddTenant from "./pages/StaffAddTenant";

// Role-based route guard
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");
  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/login" replace />;
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
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roommanagement"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <RoomManagement />
          </ProtectedRoute>
        }
      />
      <Route
  path="/editroom/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <EditRoom />
    </ProtectedRoute>
  }
/>
      <Route
        path="/tenants"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Tenants />
          </ProtectedRoute>
          
        }
      />
      <Route
        path="/addtenant"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddTenant />
          </ProtectedRoute>
        }
      />
      <Route
  path="/edittenant/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <EditTenant />
    </ProtectedRoute>
  }
/>

      <Route
        path="/addroom"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Payments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addpayment"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddPayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/announcements"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Announcements />
          </ProtectedRoute>
        }
      />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/payments"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserPayments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/announcements"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserAnnouncements />
          </ProtectedRoute>
        }
      />

      {/* Staff Routes */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/rooms"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StaffRoomManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/tenants"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StaffTenants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/add-room"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StaffAddRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/add-tenant"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StaffAddTenant />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
