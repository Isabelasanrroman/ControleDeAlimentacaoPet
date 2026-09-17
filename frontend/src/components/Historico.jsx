import { useEffect, useState } from "react";

export default function Historico() {

    const [alimentacoes, setAlimentacoes] = useState([]);


    function buscarHistorico() {

        fetch("http://127.0.0.1:5000/historico")

            .then(resposta => resposta.json())

            .then(dados => {

                setAlimentacoes(dados);

            })

            .catch(() => {

                console.log("Não foi possível carregar o histórico.");

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
                    Ver histórico
                    <i className="fa-solid fa-arrow-right"></i>
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
                                    Alimentado com sucesso
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


                            <i className="fa-solid fa-chevron-right seta-historico"></i>

                        </div>

                    ))

                )}

            </div>

        </section>

    );
}