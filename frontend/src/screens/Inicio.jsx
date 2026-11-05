import { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import Historico from "../components/Historico";


export default function Inicio() {

    const [petDetectado, setPetDetectado] = useState(false);

    const [alimentacoes, setAlimentacoes] = useState([]);


    function buscarPet() {

        fetch("https://controle-de-alimentacao-pet.vercel.app/pet")

            .then(resposta => resposta.json())

            .then(dados => {

                setPetDetectado(
                    dados.pet_detectado
                );

            })

            .catch(() => {

                console.log(
                    "Não foi possível verificar o pet."
                );

            });
    }


    function buscarHistorico() {

        fetch(
            "https://controle-de-alimentacao-pet.vercel.app/historico"
        )

            .then(resposta => resposta.json())

            .then(dados => {

                setAlimentacoes(dados);

            })

            .catch(() => {

                console.log(
                    "Não foi possível carregar o histórico."
                );

            });
    }


    useEffect(() => {

        buscarPet();

        buscarHistorico();


        const intervalo = setInterval(() => {

            buscarPet();

            buscarHistorico();

        }, 3000);


        return () => clearInterval(intervalo);

    }, []);


    const ultimaAlimentacao =
        alimentacoes.length > 0
            ? alimentacoes[0]
            : null;


    return (

        <div className="pagina">

            <Cabecalho />


            <main className="conteudo">


                {/* BANNER */}

                <section className="banner-principal">

                    <div className="banner-conteudo">


                        <div className="banner-texto">

                            <div className="saudacao">

                                <i className="fa-solid fa-paw"></i>

                                <span>
                                    Olá!
                                </span>

                            </div>


                            <h2>
                                Seu pet sempre
                                <br />
                                bem alimentado!
                            </h2>


                            <p>
                                O sistema monitora a aproximação
                                do seu pet e libera a ração
                                automaticamente no momento certo,
                                com segurança e praticidade.
                            </p>


                            <div className="beneficios">


                                <div className="beneficio">

                                    <i className="fa-solid fa-shield-heart"></i>

                                    <div>

                                        <strong>
                                            Seguro
                                        </strong>

                                        <span>
                                            Alimentação
                                            automática
                                        </span>

                                    </div>

                                </div>


                                <div className="beneficio">

                                    <i className="fa-solid fa-clock"></i>

                                    <div>

                                        <strong>
                                            Prático
                                        </strong>

                                        <span>
                                            Funciona
                                            automaticamente
                                        </span>

                                    </div>

                                </div>


                                <div className="beneficio">

                                    <i className="fa-solid fa-heart"></i>

                                    <div>

                                        <strong>
                                            Mais saúde
                                        </strong>

                                        <span>
                                            Respeita o
                                            intervalo
                                        </span>

                                    </div>

                                </div>


                            </div>

                        </div>

                        <div className="frase-decorativa">

                            Eles dependem
                            <br />
                            de você!

                            <i className="fa-solid fa-heart"></i>

                        </div>


                    </div>

                </section>


                {/* ÁREA PRINCIPAL */}

                <div className="area-principal">


                    {/* CONTROLE */}

                    <div className="coluna-esquerda">

                        <section className="card-controle">


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


                                    <span className="pet-online">

                                        <span></span>

                                        Online

                                    </span>

                                </div>


                            </div>


                            {/* NOVO STATUS */}

                            <div className="alimentacao-automatica">


                                <div className="automatica-icone">

                                    <i className="fa-solid fa-bowl-food"></i>

                                </div>


                                <div className="automatica-texto">

                                    {petDetectado ? (

                                        <>

                                            <h3>
                                                Seu pet está por perto!
                                            </h3>

                                            <p>
                                                O sensor detectou seu pet
                                                a menos de 10 cm.
                                            </p>

                                        </>

                                    ) : (

                                        <>

                                            <h3>
                                                Alimentação automática
                                            </h3>

                                            <p>
                                                O alimentador está pronto
                                                para a próxima refeição.
                                            </p>

                                        </>

                                    )}

                                </div>


                                <div
                                    className={
                                        petDetectado
                                            ? "indicador-pet detectado"
                                            : "indicador-pet"
                                    }
                                >

                                    <span></span>

                                    {petDetectado
                                        ? "Pet detectado"
                                        : "Aguardando pet"
                                    }

                                </div>


                            </div>


                            {/* ÚLTIMA ALIMENTAÇÃO */}

                            <div className="ultima-alimentacao">


                                <div className="ultima-icone">

                                    <i className="fa-regular fa-clock"></i>

                                </div>


                                <div className="ultima-texto">

                                    <span>
                                        Última alimentação
                                    </span>


                                    {ultimaAlimentacao ? (

                                        <strong>
                                            {ultimaAlimentacao.data}
                                            {" • "}
                                            {ultimaAlimentacao.hora}
                                        </strong>

                                    ) : (

                                        <strong>
                                            Nenhuma alimentação registrada
                                        </strong>

                                    )}

                                </div>


                                <i className="fa-solid fa-check ultima-check"></i>


                            </div>


                        </section>

                    </div>


                    {/* DIREITA */}

                    <div className="coluna-direita">


                        <section className="card-status">


                            <div className="status-topo">


                                <div className="status-check">

                                    <i className="fa-solid fa-check"></i>

                                </div>


                                <div>

                                    <h3>
                                        Sistema funcionando!
                                    </h3>

                                    <p>
                                        Tudo certo com o alimentador.
                                    </p>

                                </div>


                            </div>


                            <div className="status-informacoes">


                                <div className="status-info">

                                    <i className="fa-regular fa-calendar"></i>

                                    <div>

                                        <span>
                                            Última data
                                        </span>

                                        <strong>
                                            {ultimaAlimentacao
                                                ? ultimaAlimentacao.data
                                                : "--/--/----"}
                                        </strong>

                                    </div>

                                </div>


                                <div className="status-info">

                                    <i className="fa-regular fa-clock"></i>

                                    <div>

                                        <span>
                                            Último horário
                                        </span>

                                        <strong>
                                            {ultimaAlimentacao
                                                ? ultimaAlimentacao.hora
                                                : "--:--:--"}
                                        </strong>

                                    </div>

                                </div>


                            </div>

                        </section>


                        <Historico />


                    </div>


                </div>


            </main>


            <footer className="rodape">

                <div>

                    <i className="fa-solid fa-paw"></i>

                    <span>
                        Cuidando de quem depende de você
                    </span>

                    <i className="fa-solid fa-heart"></i>

                </div>


                <div>

                    <span>
                        Alimentação automática
                    </span>

                    <i className="fa-solid fa-bowl-food"></i>

                </div>

            </footer>


        </div>
    );
}