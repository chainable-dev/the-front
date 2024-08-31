import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import ProjectList from "@/components/projects/ProjectList";
import ProjectFilters from "@/components/projects/ProjectFilters";

const ProjectsPage = () => {
    return (
        <AuthenticatedLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">New Project</button>
            </div>
            <ProjectFilters />
            <ProjectList />
        </AuthenticatedLayout>
    );
};

export default ProjectsPage;