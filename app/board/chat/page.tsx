import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import Chat from "@/components/chat/Chat";

interface Params {
    id: string;
}

interface ChatPageProps {
    params: Params;
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    return (
        <AuthenticatedLayout>
            <Chat />
        </AuthenticatedLayout>
    );
};

export default ChatPage;