import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, useParams } from "react-router-dom"


export default function SeatsPage({filmId,userData,setUserData, ingressos , setIngressos}) {

    const [seatInfos , setaSeatInfos] = useState()
    const {idFilme} = useParams()
    const [color, setColor] = useState ("#C3CFD9")
    const [border, setBorder] = useState ("#808F9D")
    const [nome, setNome] = useState("")
    const [CPF , setCPF]= useState ("")
    const [seatId , setSeatId] = useState([]);
    let userReserve = {
        ids:[], 
        name:"",
        cpf:""
    }

  
    useEffect (()=>{
        const require = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idFilme}/seats`)  
        
        if(filmId !== undefined ) {
            require.then (res => {
                setaSeatInfos(res.data)

    
            })
    
            require.catch (err => {
                console.log (err.response.data.error)
            })

        }
     



    }, [])

    if (seatInfos === undefined) {
        return <div>Carregando....</div>
    }


     function addSeat(id, name){
        setSeatId([...seatId, id]);
        
        setIngressos([...ingressos, name]);   
     }

     console.log(" ingressos valem:",ingressos)
     const handleInputChange = (event) => {
         const value  = event.target.value;
        setNome(value);
      };
   
      const inputCpfChange = (event) => {
        const value  = event.target.value;
        setCPF(value);
      }
     
     
      const setarReserva = () => {
            userReserve.ids = [...seatId] 
            userReserve.name = nome
            userReserve.cpf=CPF
            setUserData({
                name:nome,
                cpf:CPF
            })
         
                axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', userReserve)
                 .then(response => console.log(response))
                 .catch(error => console.error(error));
               
              
      };
      
      
     

      

    function isAvaliableColor(){
        setColor ("#C3CFD9")
        setBorder("#808F9D")
    }
    function isNotAvaliabeColor(){
        setColor ("#FBE192")
        setBorder("F7C52B")
    }


    if (seatInfos !== undefined){

    return (


        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                            {
                                seatInfos.seats.map(s => {
                                
                          
                                return <SeatItem data-test="seat" key={s.id} color={color} border={border} onClick={()=> addSeat(s.id, s.name)}>{s.name}</SeatItem>;
                            })}

                
             </SeatsContainer> 
            
                 
       
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name"type="text" key="nome" placeholder="Digite seu nome..."  onChange={handleInputChange}/>

                CPF do Comprador:
                <input data-test="client-cpf"type="text" key="cpf" placeholder="Digite seu CPF..."  onChange={inputCpfChange} />
                <Link  to="/sucess">
                <button  data-test="book-seat-btn" onClick={()=>setarReserva()} >Reservar Assento(s)</button>
                </Link>           
               
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={seatInfos.movie.posterURL} alt={seatInfos.movie.title} />
                </div>
                <div>
                    <p>{seatInfos.movie.title}</p>
                    <p>{seatInfos.day.weekday} - {seatInfos.name}</p>
                </div>
            </FooterContainer>
        
        </PageContainer>
    )
    
    }
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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props)=>props.border };         // Essa cor deve mudar
    background-color: ${(props)=>props.color };   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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