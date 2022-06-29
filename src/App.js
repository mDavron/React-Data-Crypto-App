import React, { useState, useEffect } from "react";
//api.coincap.io/v2/assets?limit=20
function App() {
  const [coins, setCoins] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets?limit=${limit}`
      );
      const data = await res.json();
      console.log(data.data);
      setCoins(data.data);
    };
    fetchCoins();
  }, [limit]);

  const handleRefresh = () => {
    setLimit(10);
    window.scrollTo(0, 0);
  };
  return (
    <section className="coins">
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        This App uses the <a href="https://coincap.io">CoinCap API</a>
      </h1>
      <article>
        <p>Showing {coins.length} coins</p>
      </article>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price (usd)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(({ id, name, rank, priceUsd }) => {
            return (
              <tr key={id}>
                <td>{rank}</td>
                <td>{name}</td>
                <td>$ {parseFloat(priceUsd).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={() => setLimit(limit + 10)}>Next</button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    </section>
  );
}

export default App;
