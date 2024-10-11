import '../styles/contas-styles/main-contas.css';

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ContasMain() {
    const [contas, setContas] = useState([]);
    const [editConta, setEditConta] = useState(null);

    //Ref...
        const divMenu = useRef(null);
        const divContaLoad = useRef(null);

        const overflow = useRef(null);

        //Inputs...
            const inputFornc = useRef(null);
            const inputVlr = useRef(null);
            const inputVenc = useRef(null);

            //Labels...
            const inputForncLabel = useRef(null);
            const inputVlrLabel = useRef(null);
            const inputVencLabel = useRef(null);

            //Pago?
                const pgPg = useRef(null);
                const inputPgSim = useRef(null);
                const inputPgNao = useRef(null);

                //Labels...
                const pgPgP = useRef(null);
                const inputPgSimLabel = useRef(null);
                const inputPgNaoLabel = useRef(null);
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
        //Info texts...
            const deleteBtnInfo = document.createElement('p');
            deleteBtnInfo.id = '--del-info';
            deleteBtnInfo.textContent = '-';

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
        //

        //Menu...
            //Label texts...
                const fornLabelTxt = document.createElement('p');
                fornLabelTxt.id = 'f-l-l-i-fornc--';
                fornLabelTxt.textContent = 'Fornecedor:';

                const valorLabelTxt = document.createElement('p');
                valorLabelTxt.id = 'v-l-l-i-vlr';
                valorLabelTxt.textContent = 'Valor:';

                const vencLabelTxt = document.createElement('p');
                vencLabelTxt.id = 'vlr-l-l-i-venc--';
                vencLabelTxt.textContent = 'Vencimento:';

                //Pago?...
                    const pgTxt = document.createElement('p');
                    pgTxt.id = 'p-l-l-i-fornc--';
                    pgTxt.textContent = 'Pago:';
                    
                    //Sim
                    const pgSLabelTxt = document.createElement('p');
                    pgSLabelTxt.id = 'ps-l-l-i--';
                    pgSLabelTxt.textContent = 'Sim';

                    //Não
                    const pgNLabelTxt = document.createElement('p');
                    pgNLabelTxt.id = 'pn-l-l-i--';
                    pgNLabelTxt.textContent = 'Não';
                //
            //

            function changeContaMenu__(i) {
                if(i >= 0 && i < contas.length && contas[i]) {
                    const conta = contas[i];
                    setEditConta(i);
    
                    divMenu.current.style.display = 'block';
                    
                    inputFornc.current.value = conta.fornecedor || '';
                    inputVlr.current.value = conta.valor || '';
                    inputVenc.current.value = conta.vencimento || '';
    
                    //Pago
                        if(conta.pago === 'Sim') {
                            inputPgSim.current.checked = true;
                        } else {
                            inputPgNao.current.checked = true;
                        }
                    //
                } else {
                    console.log('err')
                }
            }

            function __fecharMenu() {
                divMenu.current.style.display = 'none';
                overflow.current.style.display = 'none';
            }
        
            function addContas__() {
                divMenu.current.style.display = 'block';
                overflow.current.style.display = 'block';

                setEditConta(null);
        
                inputFornc.current.value = '';
                inputVlr.current.value = '';
                inputVenc.current.value = '';

                inputPgNao.current.checked = true;
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
                                const nvsContas = data.filter((nvsContas) => {
                                    return !prevContas.some((contaExist) =>
                                        contaExist.fornecedor === nvsContas.fornecedor &&
                                        contaExist.valor === nvsContas.valor &&
                                        contaExist.vencimento === nvsContas.vencimento
                                    );
                                });

                                return [...prevContas, ...nvsContas];
                            });
                        } else {
                            console.log('err')
                        }
                    };

                    reader.readAsText(file);
                }
            }
        //

        function __confConta() {
            //inputs & labels vazios...
                const fields = [
                    { ref: inputFornc, label: inputForncLabel },
                    { ref: inputVlr, label: inputVlrLabel },
                    { ref: inputVenc, label: inputVencLabel },
                    
                    { ref: inputPgSim, label: inputPgSimLabel },
                    { ref: inputPgNao, label: inputPgNaoLabel }
                ];

                let isValid = true;

                fields.forEach(({ ref, label }) => {
                    const input = ref.current;
                    const labelRef = label.current;
                    
                    if(input && labelRef) {
                        if(input.value.trim() === '') {
                            input.classList.add('c-input-err-');
                            labelRef.classList.add('c-label-err-');
                        
                            //Verif...
                                input.addEventListener('input', () => {
                                    input.classList.remove('c-input-err-');
                                    labelRef.classList.remove('c-label-err-');
                                })
                            //

                            isValid = false;
                        } else {
                            input.classList.remove('c-input-err-');
                            labelRef.classList.remove('c-label-err-');
                           
                        }
                    } else {
                        console.log('err')
                    }
                });

                if(!isValid) {
                    return;
                }
            //

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

                    if(Array.isArray(data) && data.length > 0) {
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
    
    //Data max...
        const maxDate = "2059-12-31";
    //

    //overflow-y hidden
        const [overflowVisible, setOverflowVisible] = useState(true);

        useEffect(() => {
            const upOverflow = () => {
                if(overflow.current) {
                    if(getComputedStyle(overflow.current).display === 'block') {
                        document.documentElement.style.overflowY = 'hidden';
                    } else {
                        document.documentElement.overflowY = '';
                    }
                }
            }

            upOverflow();

            const observer = new MutationObserver(upOverflow);
            observer.observe(overflow.current, { attributes: true, attributeFilter: ['style'] })
        }, [overflowVisible]);
    //

    //Deletar contas...
        const deletarContas__ = (i) => {
            const nvConta = [...contas];
            nvConta.splice(i, 1);

            setContas(nvConta)
        }
    //

    return (
        <>
            {/* Voltar... */}
            <button id='--b-p-c' onClick={__rdrctBack}>Voltar</button>

            {/* Adicionar contas... */}
                <button id="add-btn--" ref={btnAddContas} onClick={(addContas__)}>+</button>
            {/* */}

            {/* Baixar JSON */}
            <button id='btn-d-json--' onClick={downloadJSON__} disabled={contas.length === 0}>Baixar contas</button>

            {/* Carregar JSON... */}
            <label id='l-l-json--' htmlFor='i-l-json'>
                <input id='i-l-json--' type='file' accept='application/json' onChange={__loadJSON} />
                <p>Carregar contas</p>
            </label>
            
            {/* hr */}
            <hr></hr>

            {/* --- Menu Contas Main --- */}
                {/* overflow */}
                    <div id="overflow" ref={overflow}></div>
                {/* */}

                <div id="d-menu--" ref={divMenu} style={{ display: 'none' }}>
                    <div id="d-menu-elmts--">
                        {/* Confirmar e fechar... */}
                            <button id="btn-c-conta--" ref={btnConf} onClick={__confConta}>Confirmar</button>
                            <button id="btn-f-menu--" ref={btnFechar} onClick={__fecharMenu}>X</button>
                        {/* */}

                        {/* Forncedor... */}
                            <label id="l-i-fornc" htmlFor="i-fornc--" ref={inputForncLabel}>{fornLabelTxt.textContent}</label>
                            <input id="i-fornc--" ref={inputFornc} />

                            {/* Lista Fornecedores JSON... */}
                                <input type="file" id="i-l-fornc--" accept="application/json" onChange={__loadFornc}></input>
                                <label id="l-i-l-fornc--" htmlFor="i-l-fornc--">Lista</label>

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
                            <label id="l-i-vlr--" htmlFor="i-vlr--" ref={inputVlrLabel}>{valorLabelTxt.textContent}</label>
                            <input id="i-vlr--" type="number" ref={inputVlr} />
                        {/* */}

                        {/* Vencimento... */}
                            <label id="l-i-venc--" htmlFor="i-venc--" ref={inputVencLabel}>{vencLabelTxt.textContent}</label>
                            <input id="i-venc--" type="date" max={maxDate} ref={inputVenc} />
                        {/* */}

                        {/* Pago? (input) */}
                            <p id="pg-" ref={pgPgP}>{pgTxt.textContent}</p>

                            <div id="pg-s">
                                <input id="i-pg-s--" type="radio" name="pg-sn" ref={inputPgSim} />
                                <label id='l-i-pg-s--' htmlFor="i-pg-s" ref={inputPgSimLabel}>{pgSLabelTxt.textContent}</label>
                            </div>

                            <div id="pg-n">
                                <input id="i-pg-n--" type="radio" name="pg-sn" ref={inputPgNao}/>
                                <label id='l-i-pg-n--' htmlFor="i-pg-n--" ref={inputPgNaoLabel}>{pgNLabelTxt.textContent}</label>
                            </div>
                        {/* */}
                    </div>
                </div>
            {/* ------ */}

            {/* Exibir contas & Editar contas... */}
                <div ref={divContaLoad} onDoubleClick={(e) => {
                    const target = e.target.closest('#--d-c');

                    if(target) {
                        const index = Array.from(divContaLoad.current.children).indexOf(target);
                        changeContaMenu__(index);
                    }
                }}>
                    {contas.map((conta, i) => (
                        <div key={i} id='--d-c'>
                            <button id="c-btn-del--" onClick={() => deletarContas__(i)}>{deleteBtnInfo.textContent}</button>

                            <p>{fornInfo.textContent} {conta.fornecedor}</p>
                            <p>{valorInfo.textContent} {parseFloat(conta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <p>{vencInfo.textContent} {new Date(conta.vencimento + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                            <p>{pgInfo.textContent} {conta.pago}</p>
                        </div>
                    ))}
                </div>
            {/* */}
        </>
    )
}

export default ContasMain;