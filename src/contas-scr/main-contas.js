import '../styles/contas-styles/main-contas.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ContasMain() {
    const [contas, setContas] = useState([]);
    const [editConta, setEditConta] = useState(null);

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

            const btnListFornc = useRef(null);
        //

        //Mudar Inputs...
        const selectForn = useRef(null);
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

        //Menu...
            function changeContaMenu__(i) {
                const conta = contas[i];
                setEditConta(i);

                divMenu.current.style.display = 'block';
                
                inputFornc.current.value = conta.fornecedor;
                inputVlr.current.value = conta.valor;
                inputVenc.current.value = conta.vencimento;

                //Pago
                    if(conta.pago === 'Sim') {
                        inputPgSim.current.checked = true;
                    } else {
                        inputPgNao.current.checked = true;
                    }
                //
            }

            function __fecharMenu() {
                divMenu.current.style.display = 'none';
            }
        
            function addContas__() {
                divMenu.current.style.display = 'block';
                setEditConta(null);
        
                inputFornc.current.value = '';
                inputVlr.current.value = '';
                inputVenc.current.value = '';

                inputPgNao.current.checked = false;
                inputPgSim.current.checked = false;
            }
        //

        //JSON...
            function downloadJSON__() {
                //Criar arquivo...
                    const json = JSON.stringify(contas, null, 2);
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
                            setContas((prevContas) => {
                                const nvsContas = prevContas.filter((nvsContas) => {
                                    return !prevContas.some((contaExist) =>
                                        contaExist.fornecedor === nvsContas.fornecedor &&
                                        contaExist.valor === nvsContas.valor &&
                                        contaExist.vencimento === nvsContas.vencimento
                                    );
                                }) 

                                return [...prevContas, ...nvsContas];
                            });
                        } else {
                            const nvsContas = data;

                            setContas((prevContas) => {
                                const contaExist = prevContas.some((contaExist) => {
                                    return !prevContas.some((contaExist) =>
                                        contaExist.fornecedor === nvsContas.fornecedor &&
                                        contaExist.valor === nvsContas.valor &&
                                        contaExist.vencimento === nvsContas.vencimento 
                                    );

                                    if(!contaExist) {
                                        return [...prevContas, ...nvsContas];
                                    }

                                    return prevContas;
                                })
                            });
                        }
                    };

                    reader.readAsText(file);
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

            if(editConta !== null) {
                setContas((prevContas) => {
                    const nvContaEdit = [...prevContas];
                    nvContaEdit[editConta] = nvConta;

                    return nvContaEdit;
                })
            } else {
                setContas((prevContas => [...prevContas, nvConta]));
            }

            __fecharMenu();
        }
    //

    //Fornc JSON...
        const [forncs, setForncs] = useState([]);

        useEffect(() => {
            setForncs([]);
        }, []);

        function __loadFornc(e) {
            const file = e.target.files[0];

            if(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = JSON.parse(e.target.result);

                    if(Array.isArray(data) && data.length > 1) {
                        const forncArray = data.map(item => item.rzSocial);
                        setForncs(forncArray);

                        if(forncArray.length > 0) {
                            inputFornc.current.value = forncArray[0];
                        }
                    } else {
                        console.log('err')
                    }
                };

                reader.readAsText(file);
            }
        }

        function changeInput(item) {
            inputFornc.current.value = item;
        }
    //
    
    //Voltar...
        const navigate = useNavigate();

        function __rdrctBack() {
            navigate('/');
        }
    //

    return (
        <>
            {/* Voltar... */}
            <button id='--b-p-c' onClick={__rdrctBack}>Voltar</button>

            {/* Adicionar contas... */}
                <button id="add-btn--" ref={btnAddContas} onClick={(addContas__)}>+</button>
            {/* */}

            {/* --- Menu Contas Main --- */}
                <div id="d-menu--" ref={divMenu} style={{ display: 'none' }}>
                    <div id="d-menu-elmts--">
                        {/* Confirmar e fechar... */}
                            <button id="btn-c-conta--" ref={btnConf} onClick={__confConta}>Confirmar</button>
                            <button id="btn-f-menu--" ref={btnFechar} onClick={__fecharMenu}>X</button>
                        {/* */}

                        {/* Forncedor... */}
                            <input id="i-fornc--" ref={inputFornc} />

                            {/* Lista Fornecedores JSON... */}
                                <input type="file" id="i-l-fornc--" accept="application/json" onChange={__loadFornc}></input>
                                <label htmlFor="i-l-fornc--">Lista</label>

                                <div id='opt-fornc--'>
                                    {forncs.map((item, i) => (
                                        <div key={i} onClick={() => changeInput(item)} id='opt-fornc-b--'>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            {/* */}
                        {/* */}

                        {/* Valor... */}
                            <input id="i-vlr--" ref={inputVlr} />
                        {/* */}

                        {/* Vencimento... */}
                            <input id="i-venc--" ref={inputVenc} />
                        {/* */}

                        {/* Pago? (input) */}
                            <div id="pg-s">
                                <input id="i-pg-s--" type="radio" name="pg-sn" ref={inputPgSim} />
                                <label htmlFor="i-pg-s">Sim</label>
                            </div>

                            <div id="pg-n">
                                <input id="i-pg-n--" type="radio" name="pg-sn" ref={inputPgNao} />
                                <label htmlFor="i-pg-n--">Não</label>
                            </div>
                        {/* */}
                    </div>
                </div>
            {/* ------ */}
            
            {/* Baixar JSON */}
            <button id='btn-d-json--' onClick={downloadJSON__} disabled={contas.length === 0}>Baixar contas</button>

            {/* Carregar JSON... */}
            <input type='file' accept='application/json' onChange={__loadJSON} />

            {/* Exibir contas & Editar contas... */}
                <div ref={divContaLoad} onDoubleClick={(e) => {
                    const target = e.target.closest('#--d-c');

                    if(target) {
                        const index = Array.from(divContaLoad.current.children).indexOf(target);
                        changeContaMenu__(index);
                    }
                }}>
                    <div ref={divContaLoad}>
                        {contas.map((conta, i) => (
                            <div key={i} id='--d-c'>
                                <p>{fornInfo.textContent} {conta.fornecedor}</p>
                                <p>{valorInfo.textContent} {conta.valor}</p>
                                <p>{vencInfo.textContent} {conta.vencimento}</p>
                                <p>{pgInfo.textContent} {conta.pago}</p>
                            </div>
                        ))}
                    </div>
                </div>
            {/* */}
        </>
    )
}

export default ContasMain;