import React, { useState, useEffect, CSSProperties } from "react";
import { FadeLoader } from "react-spinners";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMountLoad, setIsMountLoad] = useState(true);
  // let [color, setColor] = useState("#ffffff");

  async function handleGetJoke() {
    setLoading(true);
    setError(null);
    // setAdvice(null);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      // console.log(data);
      setAdvice(data.slip.advice);
    } catch (error) {
      setError("Something went wrong! Please try again later!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchMountAdvice() {
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        setAdvice(data.slip.advice);
      } catch (error) {
        setError("Something went wrong! Try refreshing the page!");
      } finally {
        setIsMountLoad(false);
      }
    }

    fetchMountAdvice();
  }, []);

  // useEffect(() => {
  //   handleGetJoke();
  // }, []);

  return (
    <>
      <main className="container">
        <h1 className="heading">Hello there</h1>

        <button
          type="button"
          onClick={handleGetJoke}
          disabled={loading}
          className="fetchBtn"
        >
          {loading ? "Please wait...." : "Get a Random Joke"}
        </button>

        {!isMountLoad && loading && (
          <div className="loadingAnime">
            <FadeLoader
              color="blue"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}

        <p className="adviceSection">{advice}</p>

        {error && <p className="errorSection">{error}</p>}
      </main>
    </>
  );
}

export default App;
