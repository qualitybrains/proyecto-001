import SignUpForm from './components/signUpForm';

export default function SignUp() {
  return (
    <div className="flex min-h-screen max-w-full flex-col items-center p-24">
      <h1 className="text-5xl font-bold">Entrenador Hábitos - Quality Brains</h1>
      <div className="mt-10">
        <SignUpForm />
      </div>
    </div>
  );
}
