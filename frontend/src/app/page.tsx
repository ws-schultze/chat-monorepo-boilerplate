import { Hero } from "./hero";

export default async function Home() {
  return (
    <main className="flex flex-col gap-5 justify-center items-center p-5">
      <Hero />
    </main>
  );
}
