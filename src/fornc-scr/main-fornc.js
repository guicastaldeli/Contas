import '../styles/fornc-styles/main-fornc.css';

import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ForncMain() {
    const [fornc, setFornc] = useState([]);
    const [editForn, setEditFornc] = useState([]);

    //Menu (Novos Forncedores)...
        //Refs (Novos Fornecedores)...
            const divMenu = useRef(null);
            const divElmts = useRef(null);
            const overflow = useRef(null);

            const divForncLoad = useRef(null);

            //Buttons...
                const btnFecharMenu = useRef(null);
                const btnConfButton = useRef(null);
            //
            
            //Labels...
                const rzSocialLabel = useRef(null);
                const nmFantLabel = useRef(null);
                const celLabel = useRef(null);
                const cnpjCpfLabel = useRef(null);
                const cepLabel = useRef(null);
                const insEstLabel = useRef(null);
                const endcoLabel = useRef(null);
                const bairroLabel = useRef(null);
                const cidLabel = useRef(null);
                const ufLabel = useRef(null);
                const emailLabel = useRef(null);
                const wSiteLabel = useRef(null);
            //

            //Inputs...
                const inputRzSocial = useRef(null);
                const inputForncNome = useRef(null);
                const inputCel = useRef(null);

                //Inputs dados cadastrais...
                    const inputCnpjCpf = useRef(null);
                    const inputCep = useRef(null);
                    const inputInscEst = useRef(null);
                    const inputEndco = useRef(null);
                    const inputBairro = useRef(null);
                    const inputCidade = useRef(null);
                    const inputUf = useRef(null);
                    const inputEmail = useRef(null);
                    const inputWSite = useRef(null);
                //
            //
        //

        //Info Texts...
            const rzSocialInfo = document.createElement('p');
            rzSocialInfo.id = 'rz-social-info--';
            rzSocialInfo.textContent = 'Razão Social: ';

            const nomeFantInfo = document.createElement('p');
            nomeFantInfo.id = 'n-fant-info--';
            nomeFantInfo.textContent = 'Nome Fantasia: ';

            const celInfo = document.createElement('p');
            celInfo.id = 'c-txt-info--';
            celInfo.textContent = 'Celular/Telefone: ';

            const cnpjCpfInfo = document.createElement('p');
            cnpjCpfInfo.id = 'cnpj-cpf-info--';
            cnpjCpfInfo.textContent = 'CNPJ/CPF: ';

            const cepInfo = document.createElement('p');
            cepInfo.id = 'cep-info--';
            cepInfo.textContent = 'CEP: ';

            const inscEstInfo = document.createElement('p');
            inscEstInfo.id = 'insc-est-info--';
            inscEstInfo.textContent = 'Inscrição Estadual: ';

            const endcoInfo = document.createElement('p');
            endcoInfo.id = 'endco-info--';
            endcoInfo.textContent = 'Endereço: ';

            const bairroInfo = document.createElement('p');
            bairroInfo.id = 'b-info--';
            bairroInfo.textContent = 'Bairro: ';

            const cidadeInfo = document.createElement('p');
            cidadeInfo.id = 'cid-info--';
            cidadeInfo.textContent = 'Cidade: ';

            const ufInfo = document.createElement('p');
            ufInfo.id = 'uf-info--';
            ufInfo.textContent = 'UF: ';

            const emailInfo = document.createElement('p');
            emailInfo.id = 'email-info--';
            emailInfo.textContent = 'E-mail: ';

            const wSiteInfo = document.createElement('p');
            wSiteInfo.id = 'w-site-info--';
            wSiteInfo.textContent = 'Site: ';

            const deleteBtnInfo = document.createElement('p');
            deleteBtnInfo.id = 'btn-del-info--';
            deleteBtnInfo.textContent = '-';
        //

        //JSON...
            function downloadJSON__() {
                //Criar arquivo...
                    const json = JSON.stringify(fornc, null, 2);
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);

                    //(a)
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'fornecedores.json';
                        a.click();

                        a.remove();
                        URL.revokeObjectURL(url);

                        document.body.appendChild(a);
                    //
                //
            }

            //Carregar arquivo...
                function __loadJSON(e) {
                    const file = e.target.files[0];

                    if(file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const data = JSON.parse(e.target.result);

                            if(Array.isArray(data)) {
                                setFornc((prevFornc) => {
                                    const nvsForncs = data.filter((nvsFornc) => {
                                        return !prevFornc.some((fornExist) =>
                                            fornExist.rzSocial === nvsFornc.rzSocial &&
                                            fornExist.nmFant === nvsFornc.nmFant &&
                                            fornExist.cel === nvsFornc.cel &&
                                            fornExist.cnpjCpf === nvsFornc.cnpjCpf &&
                                            fornExist.cep === nvsFornc.cep &&
                                            fornExist.insEst === nvsFornc.insEst &&
                                            fornExist.endco === nvsFornc.endco &&
                                            fornExist.bairro === nvsFornc.bairro &&
                                            fornExist.cidade === nvsFornc.cidade &&
                                            fornExist.uf === nvsFornc.uf &&
                                            fornExist.email === nvsFornc.email &&
                                            fornExist.wSite === nvsFornc.wSite
                                        );
                                    });

                                    return [...prevFornc, ...nvsForncs];
                                });
                            } else {
                                const nvsFornc = data;

                                setFornc((prevFornc) => {
                                    if (!prevFornc.some((fornExist) =>
                                        fornExist.rzSocial === nvsFornc.rzSocial &&
                                        fornExist.nmFant === nvsFornc.nmFant &&
                                        fornExist.cel === nvsFornc.cel &&
                                        fornExist.cnpjCpf === nvsFornc.cnpjCpf &&
                                        fornExist.cep === nvsFornc.cep &&
                                        fornExist.insEst === nvsFornc.insEst &&
                                        fornExist.endco === nvsFornc.endco &&
                                        fornExist.bairro === nvsFornc.bairro &&
                                        fornExist.cidade === nvsFornc.cidade &&
                                        fornExist.uf === nvsFornc.uf &&
                                        fornExist.email === nvsFornc.email &&
                                        fornExist.wSite === nvsFornc.wSite
                                    )) {
                                        return [...prevFornc, data];
                                    }
                                    return prevFornc;
                                });
                            }
                        };

                        reader.readAsText(file);
                    }
                }
            //
        //

        //Menu...
            function showAddMenu__() {
                divMenu.current.style.display = 'block';
                divElmts.current.style.display = 'block';
                
                overflow.current.style.display = 'block';

                setEditFornc(null);

                //Limpar Inputs...
                    const inputs = divElmts.current.querySelectorAll('input');

                    inputs.forEach(input => {
                        input.value = '';
                    });
                //
            }

            function fecharMenu__() {
                divMenu.current.style.display = 'none';
                divElmts.current.style.display = 'none';

                overflow.current.style.display = 'none';
            }

            function __confFornc() {
                //inputs & labels vazios...
                    const fields = [
                        { ref: inputRzSocial, label: rzSocialLabel },
                        { ref: inputForncNome, label: nmFantLabel },
                        { ref: inputCel, label: celLabel },
                        { ref: inputCnpjCpf, label: cnpjCpfLabel },
                        { ref: inputCep, label: cepLabel },
                        { ref: inputInscEst, label: insEstLabel },
                        { ref: inputEndco, label: endcoLabel },
                        { ref: inputBairro, label: bairroLabel },
                        { ref: inputCidade, label: cidLabel },
                        { ref: inputUf, label: ufLabel },
                        { ref: inputEmail, label: emailLabel },
                        { ref: inputWSite, label: wSiteLabel }
                    ];

                    let isValid = true;

                    fields.forEach(({ ref, label }) => {
                        const input = ref.current;
                        const labelRef = label.current;

                        if(input && labelRef) {
                            if(input.value.trim() === '') {
                                input.classList.add('input-err-');
                                labelRef.classList.add('label-err-');
        
                                //Verif...
                                    input.addEventListener('input', () => {
                                        input.classList.remove('input-err-');
                                        labelRef.classList.remove('label-err-');
                                    })
                                //

                                isValid = false;
                            } else {
                                input.classList.remove('input-err-');
                                labelRef.classList.remove('label-err-');
                            }
                        }
                    })

                    if(!isValid) {
                        return;
                    }
                //

                const nvFornc = {
                    rzSocial: inputRzSocial.current.value,
                    nmFant: inputForncNome.current.value,
                    cel: inputCel.current.value,
                    cnpjCpf: inputCnpjCpf.current.value,
                    cep: inputCep.current.value,
                    insEst: inputInscEst.current.value,
                    endco: inputEndco.current.value,
                    bairro: inputBairro.current.value,
                    cidade: inputCidade.current.value,
                    uf: inputUf.current.value,
                    email: inputEmail.current.value,
                    wSite: inputWSite.current.value, 
                };
        
                if (editForn !== null) {
                    setFornc((prevFornc) => {
                        const nvForncEdit = [...prevFornc];
                        nvForncEdit[editForn] = nvFornc;
        
                        return nvForncEdit;
                    });
                } else {
                    setFornc((prevFornc) => [...prevFornc, nvFornc]);
                }
        
                fecharMenu__();
            }

            function changeForncMenu__(i) {
                if(i >= 0 && i < fornc.length && fornc[i]) {
                    const forncData = fornc[i];
                    setEditFornc(i);

                    divMenu.current.style.display = 'block';
                    divElmts.current.style.display = 'block';
                    overflow.current.style.display = 'block';
    
                    inputRzSocial.current.value = forncData.rzSocial;
                    inputForncNome.current.value = forncData.nmFant;
                    inputCel.current.value = forncData.cel;
                    inputCnpjCpf.current.value = forncData.cnpjCpf;
                    inputCep.current.value = forncData.cep
                    inputInscEst.current.value = forncData.insEst;
                    inputEndco.current.value = forncData.endco;
                    inputBairro.current.value = forncData.bairro;
                    inputCidade.current.value = forncData.cidade;
                    inputUf.current.value = forncData.uf;
                    inputEmail.current.value = forncData.email;
                    inputWSite.current.value = forncData.wSite;
                } else {
                    console.log('errrejj')
                }
            }
        //

        //oveflow-y hidden
            const [overflowVisible, setOverflowVisible] = useState(true);

            useEffect(() => {
                const upOverflow = () => {
                    if(overflow.current) {
                        if(getComputedStyle(overflow.current).display === 'block') {
                            document.documentElement.style.overflowY = 'hidden';
                        } else {
                            document.documentElement.style.overflowY = '';
                        }
                    }
                }

                upOverflow();

                const observer = new MutationObserver(upOverflow);
                observer.observe(overflow.current, { attributes: true, attributeFilter: ['style'] });
            }, [overflowVisible]);
        //
    //

    //Voltar...
        const navigate = useNavigate();

        function __rdrctBack() {
            navigate('/');
        }
    //

    //Deletar :((...
        const deletarFornc__ = (i) => {
            const nvFornc = [...fornc];
            nvFornc.splice(i, 1);

            setFornc(nvFornc);
        }
    //

    return (
        <>
            {/* overflow */}
            <div id="overflow" ref={overflow} onClick={showAddMenu__}></div>

            {/* Voltar... */}
            <button id='--b-p-f' onClick={__rdrctBack}>Voltar</button>

            {/* ------ Novos Fornecedores ------ */}
                {/* Adicionar fornecedores... */}
                    <button id="add-fornc--" onClick={showAddMenu__}>+</button>
                {/* */}

                {/* Baixar JSON */}
                <button id='btn-d-json-f--' onClick={downloadJSON__} disabled={fornc.length === 0}>Baixar fornecedores</button>

                {/* Carregar JSON */}
                <label id='l-l-json-f--' htmlFor='i-l-json-f--'>
                    <input id='i-l-json-f--' type='file' accept='application/json' onChange={__loadJSON} />
                    <p>Carregar fornecedores</p>
                </label>

                {/* hr */}
                <hr></hr>

                {/* --- Menu --- */}
                    <div id="d-menu-fornc--" ref={divMenu} style={{ display: 'none' }}>
                        <div id="d-menu-fornc-elmts--" ref={divElmts}>
                            {/* Fechar... */}
                                <button id="btn-f-menu-fornc--" ref={btnFecharMenu} onClick={fecharMenu__}>X</button>
                            {/* */}

                            {/* Fornecedor... */}
                                <label htmlFor='i-rz-social' id="l-" className="i-1-" ref={rzSocialLabel}>Razão Social:</label>
                                <input id="i-rz-social--" className="i-1-" ref={inputRzSocial}></input>

                                <label htmlFor='i-fornc-nome' id="l-" className="i-1-" ref={nmFantLabel}>Nome Fantasia:</label>
                                <input id="i-fornc-nome" className="i-1-" ref={inputForncNome}></input>

                                <label htmlFor='i-cel--' id="l-" className="i-1-" ref={celLabel}>Celular/Telefone:</label>
                                <input id="i-cel--" className="i-1-" type="number" ref={inputCel}></input>

                                {/* Dados Casdastrais */}
                                    <label htmlFor="i-cnpj-cpf--" id="l-" className="i-2-" ref={cnpjCpfLabel}>CPNJ ou CPF:</label>
                                    <input id="i-cnpj-cpf--" className="i-2-" type="number" ref={inputCnpjCpf}></input>

                                    <label htmlFor="i-cep--" id="l-" className="i-2-" ref={cepLabel}>CEP:</label>
                                    <input id="i-cep--" className="i-2-" type="number" ref={inputCep}></input>

                                    <label htmlFor="i-ins-est--" id="l-" className="i-2-" ref={insEstLabel}>Inscrição Estadual:</label>
                                    <input id="i-ins-est--" className="i-2-" type="number" ref={inputInscEst}></input>

                                    <label htmlFor="i-endco--" id="l-" className="i-3-" ref={endcoLabel}>Endereço:</label>
                                    <input id="i-endco--" className="i-3-" ref={inputEndco}></input>

                                    <label htmlFor="i-bairro--" id="l-" className="i-3-" ref={bairroLabel}>Bairro:</label>
                                    <input id="i-bairro--" className="i-3-" ref={inputBairro}></input>

                                    <label htmlFor="i-cidade--" id="l-" className="i-3-" ref={cidLabel}>Cidade:</label>
                                    <input id="i-cidade--" className="i-3-" ref={inputCidade}></input>

                                    <label htmlFor="i-uf--" id="l-" className="i-3-" ref={ufLabel}>UF:</label>
                                    <input id="i-uf--" className="i-3-" ref={inputUf}></input>

                                    <label htmlFor="i-email--" id="l-" className="i-4-" ref={emailLabel}>E-mail:</label>
                                    <input id="i-email--" className="i-4-" ref={inputEmail}></input>

                                    <label htmlFor="i-w-site--" id="l-" className="i-4-" ref={wSiteLabel}>Site:</label>
                                    <input id="i-w-site--" className="i-4-" ref={inputWSite}></input>
                                {/* */}
                            {/* */}

                            {/* Cadastrar... */}
                                <button id="btn-c-fornc--" ref={btnConfButton} onClick={__confFornc}>Cadastrar</button>
                            {/* */}
                        </div>
                    </div>
                {/* */}
            {/* -------------------------------- */}

            {/* Exibir Fornecedores & Editar Fornecedores... */}
                <div ref={divForncLoad} onDoubleClick={(e) => {
                    const target = e.target.closest('#--d-fornc');

                    if(target) {
                        const index = Array.from(divForncLoad.current.children).indexOf(target);
                        changeForncMenu__(index);
                    }
                }}>
                    {fornc.map((fnc, i) => (
                        <div key={i} id='--d-fornc'>
                            <p>{rzSocialInfo.textContent} {fnc.rzSocial}</p>
                            <p>{nomeFantInfo.textContent} {fnc.nmFant}</p>
                            <p>{celInfo.textContent} {fnc.cel}</p>
                            <p>{cnpjCpfInfo.textContent} {fnc.cnpjCpf}</p>
                            <p>{inscEstInfo.textContent} {fnc.insEst}</p>
                            <p>{endcoInfo.textContent} {fnc.endco}</p>
                            <p>{bairroInfo.textContent} {fnc.bairro}</p>
                            <p>{cidadeInfo.textContent} {fnc.cidade}</p>
                            <p>{ufInfo.textContent} {fnc.uf}</p>
                            <p>{emailInfo.textContent} {fnc.email}</p>
                            <p>{wSiteInfo.textContent} {fnc.wSite}</p>

                            <button id="btn-del--" onClick={() => deletarFornc__(i)}>{deleteBtnInfo.textContent}</button>
                        </div>
                    ))}
                </div>
            {/* */}
        </>
    )
}

export default ForncMain;