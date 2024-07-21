import SignUpForm from './components/signUpForm';

export default function SignUp() {
  return (
    <main className="flex min-h-screen max-w-full flex-col items-center p-24">
      <section>
        <h1 className="text-5xl font-bold">Entrenador Hábitos - Quality Brains</h1>
      </section>
      <div className="mt-10">
        <SignUpForm />
      </div>
    </main>
  );
}
