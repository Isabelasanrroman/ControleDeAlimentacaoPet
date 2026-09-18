import { useEffect, useState } from "react";

import Cabecalho from "../components/Cabecalho";
import Botao from "../components/Botao";
import Historico from "../components/Historico";

import imagemPets from "../../assets/pets-banner.png";

export default function Inicio() {

    const [petDetectado, setPetDetectado] = useState(false);

    const [mensagem, setMensagem] = useState("");

    const [dataAtual, setDataAtual] = useState("");

    const [horaAtual, setHoraAtual] = useState("");


    function atualizarDataHora() {

        const agora = new Date();

        const data = agora.toLocaleDateString("pt-BR");

        const hora = agora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });

        setDataAtual(data);

        setHoraAtual(hora);
    }


    function verificarPet() {

        fetch("https://controle-de-alimentacao-pet.vercel.app/pet")

            .then(resposta => resposta.json())

            .then(dados => {

                setPetDetectado(dados.pet_detectado);

            })

            .catch(() => {

                setMensagem(
                    "Não foi possível conectar ao sistema."
                );

            });
    }


    function liberarAlimentacao() {

        fetch("https://controle-de-alimentacao-pet.vercel.app/liberar", {
            method: "POST"
        })

            .then(resposta => resposta.json())

            .then(dados => {

                setMensagem(
                    dados.mensagem + " às " + dados.hora
                );

                setPetDetectado(false);

            })

            .catch(() => {

                setMensagem(
                    "Não foi possível liberar a alimentação."
                );

            });
    }


    function recusarAlimentacao() {

        fetch("https://controle-de-alimentacao-pet.vercel.app/recusar", {
            method: "POST"
        })

            .then(resposta => resposta.json())

            .then(dados => {

                setMensagem(dados.mensagem);

                setPetDetectado(false);

            })

            .catch(() => {

                setMensagem(
                    "Não foi possível recusar a alimentação."
                );

            });
    }


    useEffect(() => {

        verificarPet();

        atualizarDataHora();


        const intervaloPet = setInterval(() => {

            verificarPet();

        }, 2000);


        const intervaloHorario = setInterval(() => {

            atualizarDataHora();

        }, 1000);


        return () => {

            clearInterval(intervaloPet);

            clearInterval(intervaloHorario);

        };

    }, []);


    return (

        <div className="pagina">

            <Cabecalho />


            <main className="conteudo">


                {/* BANNER PRINCIPAL */}

                <section className="banner-principal">

                    <div className="banner-conteudo">

                        <div className="banner-texto">

                            <div className="saudacao">

                                <i className="fa-solid fa-paw"></i>

                                <span>
                                    Olá!
                                </span>

                            </div>


                            {petDetectado ? (

                                <h2>
                                    Seu pet está
                                    <br />
                                    por perto!
                                </h2>

                            ) : (

                                <h2>
                                    Seu pet sempre
                                    <br />
                                    bem alimentado!
                                </h2>

                            )}


                            <p>

                                {petDetectado

                                    ? "O sistema detectou seu pet no alimentador. Deseja liberar a alimentação?"

                                    : "O sistema monitora a aproximação do seu pet e garante que ele receba a ração no momento certo, com segurança e praticidade."

                                }

                            </p>


                            <div className="beneficios">

                                <div className="beneficio">

                                    <i className="fa-solid fa-shield-halved"></i>

                                    <div>

                                        <strong>
                                            Seguro
                                        </strong>

                                        <span>
                                            Apenas com
                                            <br />
                                            sua autorização
                                        </span>

                                    </div>

                                </div>


                                <div className="beneficio">

                                    <i className="fa-regular fa-heart"></i>

                                    <div>

                                        <strong>
                                            Prático
                                        </strong>

                                        <span>
                                            Receba notificações
                                            <br />
                                            em tempo real
                                        </span>

                                    </div>

                                </div>


                                <div className="beneficio">

                                    <i className="fa-solid fa-paw"></i>

                                    <div>

                                        <strong>
                                            Mais saúde
                                        </strong>

                                        <span>
                                            Alimentação na
                                            <br />
                                            hora certa
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="banner-imagem">

                            <img
                                src={imagemPets}
                                alt="Cachorro e gato"
                            />

                        </div>


                        <div className="frase-decorativa">

                            Eles dependem
                            <br />
                            de você!

                            <i className="fa-regular fa-heart"></i>

                        </div>

                    </div>

                </section>


                {/* ÁREA PRINCIPAL */}

                <section className="area-principal">


                    {/* CARD DO PET */}

                    <div className="card-controle">


                        <div className="pet-identificacao">

                            <div className="pet-foto">

                                <i className="fa-solid fa-paw"></i>

                            </div>


                            <div className="pet-informacoes">

                                <h2>
                                    Seu Pet
                                </h2>

                                <p>
                                    Alimentador inteligente
                                </p>

                                <div className="pet-online">

                                    <span></span>

                                    Online

                                </div>

                            </div>

                        </div>


                        {/* SOLICITAÇÃO DE ALIMENTAÇÃO */}

                        <div className="solicitacao">


                            <div className="solicitacao-conteudo">

                                <div className="solicitacao-icone">

                                    <i className="fa-regular fa-bell"></i>

                                </div>


                                <div className="solicitacao-texto">

                                    {petDetectado ? (

                                        <>

                                            <h3>
                                                Solicitação de Alimentação
                                            </h3>

                                            <p>
                                                O sensor detectou seu pet próximo do alimentador.
                                                <br />
                                                Deseja liberar a alimentação?
                                            </p>

                                        </>

                                    ) : (

                                        <>

                                            <h3>
                                                Aguardando seu pet
                                            </h3>

                                            <p>
                                                O alimentador está pronto para a próxima refeição.
                                                <br />
                                                Aguarde seu pet se aproximar.
                                            </p>

                                        </>

                                    )}

                                </div>


                                <div className="solicitacao-fechar">

                                    <i className="fa-solid fa-xmark"></i>

                                </div>

                            </div>


                            {petDetectado && (

                                <div className="botoes-alimentacao">

                                    <Botao
                                        texto="Liberar"
                                        tipo="liberar"
                                        icone="fa-solid fa-check"
                                        descricao="Permitir a alimentação"
                                        aoClicar={liberarAlimentacao}
                                    />


                                    <Botao
                                        texto="Recusar"
                                        tipo="recusar"
                                        icone="fa-solid fa-xmark"
                                        descricao="Não liberar agora"
                                        aoClicar={recusarAlimentacao}
                                    />

                                </div>

                            )}


                            {!petDetectado && (

                                <div className="alimentador-pronto">

                                    <div className="alimentador-icone">

                                        <i className="fa-solid fa-bowl-food"></i>

                                    </div>

                                    <div>

                                        <strong>
                                            O alimentador está pronto para a próxima refeição.
                                        </strong>

                                        <span>
                                            Aguarde seu pet se aproximar.
                                        </span>

                                    </div>

                                </div>

                            )}

                        </div>


                        {mensagem !== "" && (

                            <div className="mensagem-sistema">

                                <i className="fa-solid fa-circle-check"></i>

                                <span>
                                    {mensagem}
                                </span>

                            </div>

                        )}

                    </div>


                    {/* COLUNA DIREITA */}

                    <div className="coluna-direita">


                        {/* STATUS */}

                        <div className="card-status">

                            <div className="status-topo">

                                <div className="status-check">

                                    <i className="fa-solid fa-check"></i>

                                </div>


                                <div>

                                    <h3>
                                        Sistema funcionando!
                                    </h3>

                                    <p>
                                        Tudo certo com o seu alimentador.
                                    </p>

                                </div>

                            </div>


                            <div className="status-informacoes">

                                <div className="status-info">

                                    <i className="fa-regular fa-calendar"></i>

                                    <div>

                                        <span>
                                            Data atual
                                        </span>

                                        <strong>
                                            {dataAtual}
                                        </strong>

                                    </div>

                                </div>


                                <div className="status-info">

                                    <i className="fa-regular fa-clock"></i>

                                    <div>

                                        <span>
                                            Horário
                                        </span>

                                        <strong>
                                            {horaAtual}
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* HISTÓRICO */}

                        <Historico />

                    </div>

                </section>

            </main>


            {/* RODAPÉ */}

            <footer className="rodape">

                <div>

                    <i className="fa-solid fa-paw"></i>

                    <span>
                        Juntos por muitos momentos!
                    </span>

                    <i className="fa-regular fa-heart"></i>

                </div>


                <div>

                    <i className="fa-solid fa-paw"></i>

                    <i className="fa-regular fa-heart"></i>

                </div>

            </footer>

        </div>
    );
}