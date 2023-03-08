import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

export default function HomePage() {
    const [filmes, setFilmes] = useState ([]);
    
    useEffect (() => {
        const require = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies") 

        require.then (res => {
          
            setFilmes (res.data)

        })

        require.catch (err => {
            console.log (err.response.data.error)
        })

    }, []);
    



    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>

            
               {    
                
                    filmes.map (filme =>  <MovieContainer>{
                    <img key={filme.id} img src={filme.posterURL} alt={filme.title}/>
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