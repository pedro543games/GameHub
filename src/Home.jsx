import GameCards from "./components/GameCards";

function Home() {

  const Games = [
    { Name: "Termo", Description: "Adivinhe a palavra de 5 letras em até 6 tentativas!", CanPlay: true },
    { Name: "Teste", Description: "", CanPlay: false }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6">
      <header className="text-center mt-12">
        <h1 className="text-4xl font-bold mb-2">Hub de Jogos</h1>
        <p className="text-lg text-gray-300">Divirta-se com jogos rápidos e desafiadores direto no navegador!</p>
      </header>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <GameCards Games={Games} />
      </section>
    </div>
  );
}

export default Home;
