import { useEffect, useState } from "react";


export default function Historico() {

    const [alimentacoes, setAlimentacoes] = useState([]);


    function buscarHistorico() {

        fetch("https://controle-de-alimentacao-pet.vercel.app/historico")

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

        buscarHistorico();


        const intervalo = setInterval(() => {

            buscarHistorico();

        }, 3000);


        return () => clearInterval(intervalo);

    }, []);


    return (

        <section className="card-historico">

            <div className="titulo-historico">

                <div className="titulo-historico-esquerda">

                    <i className="fa-regular fa-calendar-check"></i>

                    <h2>
                        Últimas Alimentações
                    </h2>

                </div>

                <span className="ver-historico">
                    Histórico
                </span>

            </div>


            <div className="lista-alimentacoes">

                {alimentacoes.length === 0 ? (

                    <div className="historico-vazio">

                        <i className="fa-solid fa-paw"></i>

                        <p>
                            Nenhuma alimentação registrada ainda.
                        </p>

                    </div>

                ) : (

                    alimentacoes.map(alimentacao => (

                        <div
                            className="item-alimentacao"
                            key={alimentacao.id}
                        >

                            <div className="alimentacao-pata">

                                <i className="fa-solid fa-paw"></i>

                            </div>


                            <div className="alimentacao-info">

                                <strong>
                                    Seu pet
                                </strong>

                                <span>
                                    Alimentação liberada
                                </span>

                            </div>


                            <div className="alimentacao-data">

                                <strong>
                                    {alimentacao.hora}
                                </strong>

                                <span>
                                    {alimentacao.data}
                                </span>

                            </div>


                            <i className="fa-solid fa-check seta-historico"></i>

                        </div>

                    ))

                )}

            </div>

        </section>

    );
}