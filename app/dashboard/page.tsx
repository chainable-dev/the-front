import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import ProjectSummary from "@/components/dashboard/ProjectSummary";
import TaskOverview from "@/components/dashboard/TaskOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";

const DashboardPage = () => {
    return (
        <AuthenticatedLayout>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectSummary />
                <TaskOverview />
                <RecentActivity />
                <QuickActions />
            </div>
        </AuthenticatedLayout>
    );
};

export default DashboardPage;
