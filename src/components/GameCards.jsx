export default function GameCards({ Games }) {
  return (
    <>
      {Games.map((game, index) => (
        <a
          key={index}
          href={game.CanPlay ? `/${game.Name}` : "#"}
          className={`bg-slate-800 hover:bg-slate-700 transition p-6 rounded-xl shadow-lg cursor-pointer ${
            !game.CanPlay && "opacity-50 cursor-not-allowed"
          }`}
          aria-disabled={!game.CanPlay}
        >
          <h2 className="text-2xl font-semibold mb-2">🎲 {game.Name}</h2>
          <p className="text-gray-400">
            {game.CanPlay
              ? `${game.Description}`
              : "Em desenvolvimento..."}
          </p>
        </a>
      ))}
    </>
  );
}