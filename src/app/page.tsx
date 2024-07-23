import TopNavBar from '@/components/ui/top-navbar';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getAllUserTasks } from './api/controllers/tasks';
import { getUserProfile } from './api/controllers/users';
import AddTaskModal from './components/addTaskModal';
import TasksCarousel from './components/tasksCarousel';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/login');

  const tasks = (await getAllUserTasks(session.user?.email as string)) ?? [];

  const user = await getUserProfile(session.user?.email as string);

  return (
    <div className="flex min-h-screen max-w-full flex-col items-start px-4">
      <TopNavBar user={user} />
      <section className="mt-6 flex flex-row gap-4 px-10 align-middle">
        <h1 className="text-4xl font-bold">Tareas</h1>
        <div>
          <AddTaskModal />
        </div>
      </section>
      <div className="m-auto mt-10 flex w-full flex-row px-14">
        <TasksCarousel tasks={tasks} />
      </div>
    </div>
  );
}
