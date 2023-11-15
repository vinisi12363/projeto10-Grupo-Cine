import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function HomePage({
  filmId,
  setFilmId,
  filmes,
  setFilmes,
  sessionLink,
  setSessionLink,
  idFilm,
}) {
  useEffect(() => {
    const require = axios.get(
      "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    );

    require.then((res) => {
      setFilmes(res.data);
    });

    require.catch((err) => {
      console.log(err.response.data.error);
    });
  }, []);

  if (!filmes) {
    return <div>Carregando....</div>;
  }

  function setarIdDoFilme(id) {
    filmId = id;
    setFilmId(filmId);
  }

  return (
    <PageContainer>
      <h2>Primeiro, selecione o filme</h2>
      <ListContainer>
        {filmes.map((filme) => (
          <MovieContainer key={filme.id} data-test="movie">
            {
              <Link to={`/sessoes/${filme.id}`}>
                <img
                  key={filme.id}
                  img
                  src={filme.posterURL.toString()}
                  onClick={() => {
                    setarIdDoFilme(filme.id);
                  }}
                  alt={filme.title}
                />
              </Link>
            }
          </MovieContainer>
        ))}
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
  background: rgb(34, 193, 195);
  background: -moz-linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#22c1c3",endColorstr="#fdbb2d",GradientType=1);
`;
const ListContainer = styled.div`
  background: transparent;
  max-width: 330px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  background-color: lightgray;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
