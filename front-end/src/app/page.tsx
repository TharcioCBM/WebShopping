import Head from 'next/head';
import NavBar from '../app/components/NavBar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MarkFree</title>
        <meta name="description" content="Home page for markFree" />
      </Head>

      <NavBar />

      <main className="container mx-auto py-10">
        <p className="text-center text-gray-500"></p>
      </main>
    </div>
  );
}
