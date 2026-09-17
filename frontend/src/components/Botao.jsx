export default function Botao({ texto, tipo, aoClicar, icone, descricao }) {

    return (
        <button
            className={`botao-alimentacao ${tipo}`}
            onClick={aoClicar}
        >

            <div className="botao-icone">

                <i className={icone}></i>

            </div>

            <div className="botao-texto">

                <strong>
                    {texto}
                </strong>

                <span>
                    {descricao}
                </span>

            </div>

        </button>
    );
}