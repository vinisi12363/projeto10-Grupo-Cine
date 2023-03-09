import styled from "styled-components"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { Link , useParams} from "react-router-dom"


export default function SessionsPage({filmId, seatsLink, setSeatsLink, setSessionId, setSessionInfos, sessionInfos}) {
    const {idFilme} = useParams()
    useEffect (()=>{
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
        const require = axios.get(url)  
        
       
            require.then (res => {
               
                setSessionInfos (res.data)   
                
            })
    
            require.catch (err => {
                console.log (err.response.data.error)
            })
       
    }, [])
 
    if(sessionInfos === undefined){
        return <div>Carregando...</div>
    }
    function setarAssentos(id){
        seatsLink = `/assentos/${id}`
        setSeatsLink (seatsLink)
        setSessionId (id)
      
    }
        return (
            
        <PageContainer>
            Selecione o horário
           
            {
                   sessionInfos.days.map(session => <SessionContainer key={session.id}> {
                       <>
                            <p>{session.weekday} - {session.date}</p>
                                
                            {session.showtimes.map(time => <ButtonsContainer>{
                                <>
                                <Link to={`/assentos/${time.id}`}>
                                  <button onClick={()=>setarAssentos(time.id)}>{time.name}</button>
                                </Link>
                              
                                
                                </>

                            }  </ButtonsContainer> )}

                       </>

                    }</SessionContainer>)
             }   

              
                         
          
              <FooterContainer>
                <div>
                    <img src={sessionInfos.posterURL} alt={sessionInfos.title} />
                </div>
                <div>
                 <p>{sessionInfos.title}</p>
                </div>
            </FooterContainer>
          

          
          
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
 
    align-items:center;

    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`