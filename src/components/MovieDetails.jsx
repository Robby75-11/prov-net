import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=d02e1f58&i=${movieId}`
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Errore nel recupero dettagli film", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://striveschool-api.herokuapp.com/api/comments/`
        );
        setComments(res.data);
      } catch (err) {
        console.error("Errore nel recupero commenti", err);
      }
    };

    fetchMovie();
    fetchComments();
  }, [movieId]);

  return (
    <div style={{ padding: "20px" }}>
      {movie ? (
        <>
          <h1>{movie.Title}</h1>
          <p>{movie.Plot}</p>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <img src={movie.Poster} alt={movie.Title} />

          <h3>Commenti</h3>
          <ul>
            {comments.map((c) => (
              <li key={c.id}>{c.text}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default MovieDetails;
