import React, { useState, useEffect } from "react";
import axios from "axios";
import { Joke, Attachment } from "services/JokesData";

const DadJoke = () => {
  const [joke, setJoke] = useState<Joke>();
  const [favoriteJokes, setFavoriteJokes] = useState<string>("");
  const [newJokes, setNewJokes] = useState<string>("");
  const [showText, setShowText] = useState<boolean>(false);

  const loadJoke = () => {
    axios.get("https://icanhazdadjoke.com/slack").then((response) => {
      setJoke(response.data);
    });
  };

  useEffect(() => {
    loadJoke();
  }, [newJokes]);

  const handleFavoriteJoke: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    const newFavoriteJoke = joke?.attachments[0].text;
    if (newFavoriteJoke) {
      setFavoriteJokes(newFavoriteJoke);
      localStorage.setItem("favoriteJokes", newFavoriteJoke);
      setShowText(true);
    }
  };
  const handleNewJoke: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setNewJokes(joke?.attachments[0].text || "");
  };

  return (
    <>
      <div
        className="card border-primary mb-3"
        style={{ width: 500, margin: 20 }}
      >
        <title>Random Joke</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>

        <div className="card-body">
          <h5 className="card-title"> Random Jokes</h5>

          <p className="card-text">{joke?.attachments[0].text}</p>
          <div className="d-grid gap-2 d-md-block">
            <button
              onClick={handleFavoriteJoke}
              className="btn btn-outline-primary"
            >
              Set as favorite
            </button>
            <button onClick={handleNewJoke} className="btn btn-outline-success">
              New Joke
            </button>
          </div>
        </div>
      </div>
      {showText ? (
        <div className="card border-primary" style={{ width: 500, margin: 20 }}>
          <title>Favorite Joke</title>
          <div className="card-body">
            <h5>Favorite joke</h5>
            <p>{favoriteJokes}</p>
          </div>
        </div>
      ) : (
        <div className="card border-primary" style={{ width: 500, margin: 20 }}>
          <title>Favorite Joke</title>
          <div className="card-body">
            <h5>Favorite joke</h5>
            <p>{localStorage.getItem("favoriteJokes")}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DadJoke;
