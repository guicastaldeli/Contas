import { useState, useRef } from 'react';
import '../styles/style.css';

function ContasMain() {
    const [ showMenu, setShowMenu ] = useState();

    //Ref...
        const divMenu = useRef(null);

        //Inputs...
            const inputFornc = useRef(null);
            const inputVlr = useRef(null);
            const inputVenc = useRef(null);

            //Pago?
                const inputPgSim = useRef(null);
                const inputPgNao = useRef(null);
            //
        //

        //Buttons...
            const btnConf = useRef(null);
            const btnFechar = useRef(null);

            const btnNvFornc = useRef(null);
            const btnListFornc = useRef(null);
        //
    //

    //Menu
        function menu__() {
            
        }

        function __confConta() {
            if(divMenu.current) {
                divMenu.current.style.display = 'none';
            }
        }

        function __fecharMenu() {
            divMenu.current.style.display = 'none';
        }
    //

    return (
        <>
            {/* --- Menu Contas Main --- */}
                <div id='d-menu--' ref={divMenu}>
                    <div id='d-menu-elmts--'>
                        {/* Confirmar e fechar... */}
                            <button id='btn-c-conta--' ref={btnConf} onClick={__confConta}>Confirmar</button>
                            <button id='btn-f-menu--' ref={btnFechar} onClick={__fecharMenu}>X</button>
                        {/* */}

                        {/* Forncedor... */}
                            <input id='i-fornc--' ref={inputFornc}></input>

                            <button id='--btn-n-fornc' ref={btnNvFornc}>Novo</button>
                            <button id='--btn-l-fornc' ref={btnListFornc}>Lista</button>
                        {/* */}

                        {/* Valor... */}
                            <input id='i-vlr--' ref={inputVlr}></input>
                        {/* */}

                        {/* Vencimento... */}
                            <input id='i-venc--' ref={inputVenc}></input>
                        {/* */}

                        {/* Pago? (input) */}
                            <div id='pg-s'>
                                <input id='i-pg-s--' type='radio' name='pg-sn' ref={inputPgSim}></input>
                                <label htmlFor='i-pg-s'>Sim</label>
                            </div>

                            <div id='pg-n'>
                                <input id='i-pg-n--' type='radio' name='pg-sn' ref={inputPgNao}></input>
                                <label htmlFor='i-pg-n--'>Não</label>
                            </div>
                        {/* */}
                    </div>
                </div>
            {/* ------ */}
        </>
    )
}

export default ContasMain;