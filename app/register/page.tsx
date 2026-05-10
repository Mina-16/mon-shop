export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-2xl border bg-background px-4 py-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border bg-background px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border bg-background px-4 py-3"
          />

          <button
            className="w-full rounded-2xl bg-primary py-3 font-medium text-white"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}