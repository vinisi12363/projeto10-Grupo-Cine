import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react"

import { BrowserRouter ,Route, Routes, Link} from "react-router-dom"

export default function App() {
    const [filmId , setFilmId] = useState ("")
    const [filmes, setFilmes] = useState ([]);
    const [sessionLink, setSessionLink]= useState("")
    const [seatsLink, setSeatsLink] = useState ("")
    const [sessionId, setSessionId] = useState("")
   
   
   

    return (
        <BrowserRouter>
          <Link to="/">
          <NavContainer>CINEFLEX</NavContainer>
          </Link>
        
          
            <Routes>
           
            <Route path ="/" element= { <HomePage 
                filmId = {filmId}
                setFilmId= {setFilmId}
                filmes={filmes}
                setFilmes={setFilmes}
                sessionLink={sessionLink}
                setSessionLink={setSessionLink}
             
             /> 
            }/>

            <Route path="/sessoes/:idFilme" element={<SessionsPage 
                  filmId ={filmId} 
                  seatsLink={seatsLink}
                  setSeatsLink= {setSeatsLink}
                  setSessionId= {setSessionId}
                 

            />} />


            <Route path="/assentos/:idFilme" element= {
                <SeatsPage
                    sessionLink={sessionLink}
                    filmId ={filmId} 
                    filmes={filmes}
                   
    
                /> 
             }/>
           
            <Route path="/sucessRequire" element={<SuccessPage />} />

            </Routes>
            
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
