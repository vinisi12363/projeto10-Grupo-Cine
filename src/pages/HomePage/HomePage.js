import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, useParams} from "react-router-dom"

export default function HomePage({filmId, setFilmId, filmes, setFilmes,  sessionLink, setSessionLink, idFilm}) {
   
 
    useEffect (() => {
        const require = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies") 
    
        require.then (res => {
          
            setFilmes (res.data)
            console.log(filmes)

        })

        require.catch (err => {
            console.log (err.response.data.error)
        })

    }, []);
    
    if (!filmes) {
        return <div>Carregando....</div>
    }

    function setarIdDoFilme (id){
        filmId=id
        setFilmId(filmId);
    }
    

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>

            
               {    
                
                    filmes.map (filme =>  <MovieContainer key={filme.id}>{
                    
                    <Link to={`/sessoes/${filme.id}`}>
                             <img key={filme.id} img src={filme.posterURL.toString()} onClick={(()=>{setarIdDoFilme(filme.id)})} alt={filme.title}/>
                    </Link>
                   
                    }
                    </MovieContainer>
                
                    ) 
                 
                }
               

            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    max-width: 330px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    flex-direction: row;
    padding: 10px;
 
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
   
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`