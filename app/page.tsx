// app/page.tsx
import SearchForm from './components/SearchForm';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Jumia Product Search</h1>
      <SearchForm />
    </main>
  );
}
