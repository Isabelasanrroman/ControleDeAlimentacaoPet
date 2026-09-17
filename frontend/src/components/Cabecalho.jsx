export default function Cabecalho() {

    return (
        <header className="cabecalho">

            <div className="logo-area">

                <div className="logo-pata">
                    <i className="fa-solid fa-paw"></i>
                </div>

                <div className="logo-texto">

                    <h1>
                        Controle de
                        <br />
                        Alimentação Pet
                    </h1>

                    <p>
                        Seu pet bem cuidado, sempre!
                    </p>

                </div>

            </div>


            <nav className="menu">

                <div className="menu-item ativo">
                    <i className="fa-solid fa-house"></i>
                    <span>Início</span>
                </div>

                <div className="menu-item">
                    <i className="fa-regular fa-clock"></i>
                    <span>Histórico</span>
                </div>

            </nav>


            <div className="status-sistema">

                <i className="fa-solid fa-wifi"></i>

                <span>Sistema Online</span>

                <span className="status-bolinha"></span>

            </div>

        </header>
    );
}