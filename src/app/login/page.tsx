import LoginForm from './components/loginForm';

export default function Login() {
  return (
    <div className="flex min-h-screen max-w-full flex-col items-center p-24">
      <h1 className="text-5xl font-bold">Entrenador Hábitos - Quality Brains</h1>
      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  );
}
