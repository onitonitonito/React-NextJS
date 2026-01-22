// Define a type for the component props
type HomeProps = {
  name?: string;
};

export default function Home({ name = 'NextJS' }: HomeProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Hello, <span className="text-4xl font-bold text-red-300">{name}!</span>
        </h1>
        <p className="text-gray-600">
          Welcome to your Next.js application with Tailwind CSS
        </p>
      </div>
    </main>
  );
}
