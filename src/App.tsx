import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Dashboard } from "./pages/Dashboard";
import { MainLayout } from "./layouts/MainLayout";
import { ProfilePage } from "./pages/ProfilePage";
import { HabitsPage } from "./pages/HabitsPage";
import { TodoDash } from "./pages/TodoDash";
import { HabitsContainer } from "./pages/HabitContainer";
import { AvatarBuilderUI } from "./pages/AvatarBuilderUI";
// Import other page components as you create them
import { DashboardDailies} from "./pages/DashboardDailies";
// import { TodosPage } from "./pages/TodosPage";
// import { RewardsPage } from "./pages/RewardsPage";
// import { InventoryPage } from "./pages/InventoryPage";

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habits" element={<HabitsContainer />} />
            <Route path="/daily" element={<DashboardDailies />} />
            <Route path="/todo" element={<TodoDash />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/avatar" element={<AvatarBuilderUI />} />
            
            {/* Uncomment and implement these routes as you create the components */}
            {/* <Route path="/dailies" element={<DailiesPage />} /> */}
            {/* <Route path="/todos" element={<TodosPage />} /> */}
            {/* <Route path="/rewards" element={<RewardsPage />} /> */}
            {/* <Route path="/inventory" element={<InventoryPage />} /> */}
            
            {/* Fallback route - you might want to create a 404 page */}
            <Route path="*" element={<Navigate to="/habits" replace />} />
          </Routes>
        </MainLayout>
        <Toaster position="bottom-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
