import { useState, useRef, createElement } from 'react';
import '../styles/style.css';

function ContasMain() {
    const [contas, setContas] = useState([]);

    //Ref...
        const divMenu = useRef(null);
        const divContaLoad = useRef(null);

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
            const btnAddContas = useRef(null);

            const btnConf = useRef(null);
            const btnFechar = useRef(null);

            const btnNvFornc = useRef(null);
            const btnListFornc = useRef(null);
        //
    //

    //Contas...
        const fornInfo = document.createElement('p');
        fornInfo.id = '--f-info';
        fornInfo.textContent = 'Forncedor: ';

        const valorInfo = document.createElement('p');
        valorInfo.id = '--v-info';
        valorInfo.textContent = 'Valor: ';

        const vencInfo = document.createElement('p');
        vencInfo.id = '--venc-info';
        vencInfo.textContent = 'Vencimento: ';

        const pgInfo = document.createElement('p');
        pgInfo.id = '--pg-info';
        pgInfo.textContent = 'Pago: ';

        //JSON...
            function downloadJSON__() {
                const nvConta = {
                    fornecedor: inputFornc.current.value,
                    valor: inputVlr.current.value,
                    vencimento: inputVenc.current.value,
                    pago: inputPgNao.current.checked ? 'Não' : 'Sim',
                };

                setContas((prevContas) => [...prevContas, nvConta]);

                //Criar arquivo...
                    const json = JSON.stringify(nvConta, null, 2);
                    const blob = new Blob([json], { type: 'application/json'});
                    const url = URL.createObjectURL(blob);

                    //(a)
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'contas.json';
                        a.click();

                        a.remove();
                        URL.revokeObjectURL(url);

                        document.body.appendChild(a);
                    //
                //
            }

            function __loadJSON(e) {
                const file = e.target.files[0];

                if(file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const data = JSON.parse(e.target.result);

                        if(Array.isArray(data)) {
                            setContas((prevContas) => [...prevContas, ...data]);
        
                            loadContas__(data);
                        } else {
                            setContas((prevContas) => [...prevContas, data]);
                            loadContas__([data]);
                        }
                    };

                    reader.readAsText(file);
                }
            }
        //

        //Carregar contas...
            function loadContas__(data) {
                const contasLoad = Array.isArray(data) ? data : [data];

                for(const conta of contasLoad) {
                    const divContaJSON = document.createElement('div');
                    divContaJSON.id = '--d-c';

                    const fornTxtJSON = document.createElement('p');
                    fornTxtJSON.id = '--f-txt';
                    fornTxtJSON.textContent = `${fornInfo.textContent} ${conta.fornecedor}`;

                    const vlrTxtJSON = document.createElement('p');
                    vlrTxtJSON.id = '--v-txt';
                    vlrTxtJSON.textContent = `${valorInfo.textContent} ${conta.valor}`;

                    const vencTxtJSON = document.createElement('p');
                    vencTxtJSON.id = '--venc-txt';
                    vencTxtJSON.textContent = `${vencInfo.textContent} ${conta.vencimento}`;

                    const pgJSON = document.createElement('p');
                    pgJSON.id = '--pg';
                    pgJSON.textContent = `${pgInfo.textContent} ${conta.pago}`;

                    //Appends...
                        divContaJSON.append(fornTxtJSON);
                        divContaJSON.append(vlrTxtJSON);
                        divContaJSON.append(vencTxtJSON);
                        divContaJSON.append(pgJSON);

                        divContaLoad.current.append(divContaJSON);
                    //
                }
            }
        //

        function __confConta() {
            const nvConta = {
                fornecedor: inputFornc.current.value,
                valor: inputVlr.current.value,
                vencimento: inputVenc.current.value,
                pago: inputPgNao.current.checked ? 'Não' : 'Sim',
            };

            setContas((prevContas => [...prevContas, nvConta]));

            const divInfo = document.createElement('div');
            divInfo.id = '--d-c';

            const inputForncInfo = document.createElement('p');
            inputForncInfo.id = '--f-txt';
            inputForncInfo.textContent = `${fornInfo.textContent} ${nvConta.fornecedor}`;

            const inputVlrInfo = document.createElement('p');
            inputVlrInfo.id = '--v-txt';
            inputVlrInfo.textContent = `${valorInfo.textContent} ${nvConta.valor}`;

            const inputVencInfo = document.createElement('p');
            inputVencInfo.id = '--venc-txt'
            inputVencInfo.textContent = `${vencInfo.textContent} ${nvConta.vencimento}`;

            const pg = document.createElement('p');
            pg.id = '--pg';
            pg.textContent = `${pgInfo.textContent} ${nvConta.pago}`;

            //Append...
                divInfo.append(inputForncInfo);
                divInfo.append(inputVlrInfo);
                divInfo.append(inputVencInfo);
                divInfo.append(pg);

                divContaLoad.current.append(divInfo);
            //

            divMenu.current.style.display = 'none';
        }
    //

    //Menu...
        function menu__(inputForncValue, inputVlrValue, inputVencValue) {
            inputForncValue = inputFornc.current.value;
            inputVlrValue = inputVlr.current.value;
            inputVencValue = inputVenc.current.value;
        }

        function __fecharMenu() {
            divMenu.current.style.display = 'none';
        }
    
        function addContas__() {
            divMenu.current.style.display = 'block';
    
            inputFornc.current.value = '';
            inputVlr.current.value = '';
            inputVenc.current.value = '';

            inputPgNao.current.checked = false;
            inputPgSim.current.checked = false;
        }
    //


    return (
        <>
            {/* Adicionar contas... */}
                <button id='add-btn--' ref={btnAddContas} onClick={addContas__}>+</button>
            {/* */}

            {/* --- Menu Contas Main --- */}
                <div id='d-menu--' ref={divMenu} style={{ display: 'none' }}>
                    <div id='d-menu-elmts--'>
                        {/* Confirmar e fechar... */}
                            <button id='btn-c-conta--' ref={btnConf} onClick={__confConta}>Confirmar</button>
                            <button id='btn-f-menu--' ref={btnFechar} onClick={__fecharMenu}>X</button>
                        {/* */}

                        {/* Forncedor... */}
                            <input id='i-fornc--' ref={inputFornc} />

                            <button id='--btn-n-fornc' ref={btnNvFornc}>Novo</button>
                            <button id='--btn-l-fornc' ref={btnListFornc}>Lista</button>
                        {/* */}

                        {/* Valor... */}
                            <input id='i-vlr--' ref={inputVlr} />
                        {/* */}

                        {/* Vencimento... */}
                            <input id='i-venc--' ref={inputVenc} />
                        {/* */}

                        {/* Pago? (input) */}
                            <div id='pg-s'>
                                <input id='i-pg-s--' type='radio' name='pg-sn' ref={inputPgSim} />
                                <label htmlFor='i-pg-s'>Sim</label>
                            </div>

                            <div id='pg-n'>
                                <input id='i-pg-n--' type='radio' name='pg-sn' ref={inputPgNao} />
                                <label htmlFor='i-pg-n--'>Não</label>
                            </div>
                        {/* */}
                    </div>
                </div>
            {/* ------ */}

            {/* Carregar JSON... */}
            <input type='file' accept='application/json' onChange={__loadJSON} />

            {/* Exibir contas... */}
            <div ref={divContaLoad} />
        </>
    )
}

export default ContasMain;