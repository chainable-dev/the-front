import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import TaskList from "@/components/tasks/TaskList";
import TaskFilters from "@/components/tasks/TaskFilters";

const TasksPage = () => {
    return (
        <AuthenticatedLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <button className="bg-green-500 text-white px-4 py-2 rounded">New Task</button>
            </div>
            <TaskFilters />
            <TaskList />
        </AuthenticatedLayout>
    );
};

export default TasksPage;