import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"
import SessionsPage from "../SessionsPage/SessionsPage"



export default function SeatsPage({ filmId, userData, setUserData, ingressos, setIngressos }) {
    const [avaliableSeat, setAvaliableSeat] = useState(false)
    const [selecionado, setSelecionado] = useState(false)
    const [seatInfos, setaSeatInfos] = useState()
    const { idFilme } = useParams()
    const [nome, setNome] = useState("")
    const [CPF, setCPF] = useState("")
    const [seatId, setSeatId] = useState([]);
    const [seats, setSeats] = useState([{}])
    const colors = [

        { color: "#C3CFD9", border: "#7B8B99" },
        { color: "#FBE192", border: "#F7652B" },
        { color: "#1AAE9E", border: "#0E7D71" },
    ]
    const navigate = useNavigate();

    let userReserve = {
        ids: [],
        name: "",
        cpf: ""
    }


    useEffect(() => {
        const require = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idFilme}/seats`)

        if (filmId !== undefined) {
            require.then(res => {
                setaSeatInfos(res.data)
                console.log(res.data)
                setSeats(
                    res.data.seats.map(({ id, name, isAvailable }) => {
                        return { id, name, isAvailable, selected: false }
                    })
                   
                )
               
            })  

            require.catch(err => {
                console.log(err.response.data.error)
            })



        }




    }, [])


    if (seatInfos === undefined) {
        return <div>Carregando....</div>
    }


    function addSeat(id, name, isAvailable) {
        setSeatId([...seatId, id]);

       
        if (!isAvailable){
            alert("não é possivel selecionar um assento reservado")
        }else{
            setIngressos([...ingressos, name]);
            const newSeats= seats.map((selection)=>{
                if(selection.id === id ){
                    return {...selection, selected: !selection.selected}
                }
                return selection
            })
            setSeats(newSeats);
        }
      
    }
   


    const setarReserva = (e) => {
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many'
        e.preventDefault()
        userReserve.ids = [...seatId]
        userReserve.name = nome
        userReserve.cpf = CPF
        setUserData({
            name: nome,
            cpf: CPF
        })

        const promise = axios.post(url , userReserve)
            promise.then(res => 
                setCPF(""),
                setNome(""),
                navigate ("/sucess")
            )
            promise.catch(err=> alert(err.response.data.mensagem));


    };








    if (seatInfos !== undefined) {

        return (


            <PageContainer>
                Selecione o(s) assento(s)
                <SeatsContainer >
                    {


                        seats.map(s => {


                            return <SeatItem 
                            data-test="seat" 
                            key={s.id} 
                            color={((s.selected && s.isAvailable) && "#1AAE9E")
                                || ((!s.selected && s.isAvailable)&& "#C3CFD9")  
                                || ((!s.selected && !s.isAvailable) && "#FBE192")}
                           border={((s.selected && s.isAvailable) && "#0E7D71")
                                || ((!s.selected && s.isAvailable)&& "#7B8B99") 
                                || ((!s.selected && !s.isAvailable) && "#F7652B")} 
                            onClick={() => addSeat(s.id, s.name,s.isAvailable)}>
                            {s.name}
                            </SeatItem>;
                        })}


                </SeatsContainer>



                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle color={("#1AAE9E")} border={("#0E7D71")} />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle color={("#C3CFD9")} border={("#808F9D")} />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle color={("#FBE192")} border={("#F7C52B")} />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                 <form onSubmit={setarReserva}>
                    <Title htmlFor="name">Nome do Comprador: </Title>
                    <input 
                     id="name"
                     data-test="client-name" 
                     type="text" 
                     key="nome" 
                     placeholder="Digite seu nome..." 
                     onChange={e=>setNome(e.target.value)} 
                     required
                     />

                   <Title htmlFor="cpf">CPF do Comprador:</Title> 
                    <input 
                    id="cpf" 
                    data-test="client-cpf" 
                    type="text" 
                    key="cpf" 
                    placeholder="Digite seu CPF..." 
                    onChange={e=>setCPF(e.target.value)} 
                    required
                    />
                   
                        <button data-test="book-seat-btn" onClick={() => setarReserva()} >Reservar Assento(s)</button>
                  
                 </form>
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
const Title = styled.label`
     margin-bottom: 5px;
    font-size: 22px;
`

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
     border: 1px solid ${(props) => props.border}; 
    background-color: ${(props) => props.color};    // Essa cor deve mudar
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
    border: 1px solid ${(props) => props.border}; 
    background-color: ${(props) => props.color};   // Essa cor deve mudar
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