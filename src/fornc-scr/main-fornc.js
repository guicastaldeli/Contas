import '../styles/fornc-styles/main-fornc.css';
import { useState, useRef } from "react";

function ForncMain() {
    const [fornc, setFornc] = useState([]);
    const [editForn, setEditFornc] = useState([]);

    //Menu (Novos Forncedores)...
        //Refs (Novos Fornecedores)...
            const divMenu = useRef(null);
            const divElmts = useRef(null);

            const divForncLoad = useRef(null);

            //Buttons...
                const btnFecharMenu = useRef(null);
                const btnConfButton = useRef(null);
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
                                    const nvsForncs = prevFornc.filter((nvsForncs) => {
                                        return prevFornc.some((fornExist) =>
                                            fornExist.rzSocial === nvsForncs.rzSocial &&
                                            fornExist.nmFant === nvsForncs.nmFant &&
                                            fornExist.cel === nvsForncs.cel &&
                                            fornExist.cnpjCpf === nvsForncs.cnpjCpf &&
                                            fornExist.cep === nvsForncs.cep &&
                                            fornExist.insEst === nvsForncs.insEst &&
                                            fornExist.endco === nvsForncs.endco &&
                                            fornExist.bairro === nvsForncs.bairro &&
                                            fornExist.cidade === nvsForncs.cidade &&
                                            fornExist.uf === nvsForncs.uf &&
                                            fornExist.email === nvsForncs.email &&
                                            fornExist.wSite === nvsForncs.wSite
                                        );

                                        return [...prevFornc, ...nvsForncs];
                                    })
                                });
                            } else {
                                const nvsForncs = data;

                                setFornc((prevFornc) => {
                                    const forncExist = prevFornc.some((fornExist) => {
                                        return !prevFornc.some((fornExist) =>
                                            fornExist.rzSocial === nvsForncs.rzSocial &&
                                            fornExist.nmFant === nvsForncs.nmFant &&
                                            fornExist.cel === nvsForncs.cel &&
                                            fornExist.cnpjCpf === nvsForncs.cnpjCpf &&
                                            fornExist.cep === nvsForncs.cep &&
                                            fornExist.insEst === nvsForncs.insEst &&
                                            fornExist.endco === nvsForncs.endco &&
                                            fornExist.bairro === nvsForncs.bairro &&
                                            fornExist.cidade === nvsForncs.cidade &&
                                            fornExist.uf === nvsForncs.uf &&
                                            fornExist.email === nvsForncs.email &&
                                            fornExist.wSite === nvsForncs.wSite
                                        );

                                        if(!fornExist) {
                                            return [...prevFornc, ...nvsForncs]
                                        }

                                        return prevFornc;
                                    })
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
            }

            function __confFornc() {
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
                console.log(nvFornc)
            }

            function changeForncMenu__(i) {
                const fornc = fornc[i];
                setEditFornc(i);

                divMenu.current.style.display = 'block';
                divElmts.current.style.display = 'block';

                inputRzSocial.current.value = fornc.rzSocial;
                inputForncNome.current.value = fornc.nmFant;
                inputCel.current.value = fornc.cel;
                inputCnpjCpf.current.value = fornc.cnpjCpf;
                inputCep.current.value = fornc.cep
                inputInscEst.current.value = fornc.insEst;
                inputEndco.current.value = fornc.endco;
                inputBairro.current.value = fornc.bairro;
                inputCidade.current.value = fornc.cidade;
                inputUf.current.value = fornc.uf;
                inputEmail.current.value = fornc.email;
                inputWSite.current.value = fornc.wSite;
            }
        //
    //

    return (
        <>
            {/* ------ Novos Fornecedores ------ */}
                {/* Adicionar fornecedores... */}
                    <button id="-add-fornc--" onClick={showAddMenu__}>+</button>
                {/* */}

                {/* --- Menu --- */}
                    <div id="d-menu-fornc--" ref={divMenu} style={{ display: 'none' }}>
                        <div id="d-menu-fornc-elmts--" ref={divElmts}>
                            {/* Fechar... */}
                                <button id="btn-f-menu-fornc--" ref={btnFecharMenu} onClick={fecharMenu__}>X</button>
                            {/* */}

                            {/* Fornecedor... */}
                                <label htmlFor='i-rz-social'>Razão Social</label>
                                <input id="i-rz-social--" ref={inputRzSocial}></input>

                                <label htmlFor='i-fornc-nome'>Nome Fantasia</label>
                                <input id="i-fornc-nome" ref={inputForncNome}></input>

                                <label htmlFor='i-cel--'>Celular/Telefone</label>
                                <input id="i-cel--" ref={inputCel}></input>

                                {/* Dados Casdastrais */}
                                    <label htmlFor="i-cnpj-cpf--">CPNJ ou CPF</label>
                                    <input id="i-cnpj-cpf--" ref={inputCnpjCpf}></input>

                                    <label htmlFor="i-cep--">CEP</label>
                                    <input id="i-cep--" ref={inputCep}></input>

                                    <label htmlFor="i-ins-est--">Inscrição Estadual</label>
                                    <input id="i-ins-est--" ref={inputInscEst}></input>

                                    <label htmlFor="i-endco--">Endereço</label>
                                    <input id="i-endco--" ref={inputEndco}></input>

                                    <label htmlFor="i-bairro--">Bairro</label>
                                    <input id="i-bairro--" ref={inputBairro}></input>

                                    <label htmlFor="i-cidade--">Cidade</label>
                                    <input id="i-cidade--" ref={inputCidade}></input>

                                    <label htmlFor="i-uf--">UF</label>
                                    <input id="i-uf--" ref={inputUf}></input>

                                    <label htmlFor="i-email--">E-mail</label>
                                    <input id="i-email--" ref={inputEmail}></input>

                                    <label htmlFor="i-w-site--">Site</label>
                                    <input id="i-w-site--" ref={inputWSite}></input>
                                {/* */}
                            {/* */}

                            {/* Confirmar... */}
                                <button id="btn-c-fornc--" ref={btnConfButton} onClick={__confFornc}>Confirmar</button>
                            {/* */}
                        </div>
                    </div>
                {/* */}
            {/* -------------------------------- */}

            {/* Baixar JSON */}
            <button id='btn-d-json--' onClick={downloadJSON__}>Baixar</button>

            {/* Carregar JSON */}
            <input type='file' accept='application/json' onChange={__loadJSON} />

            {/* Exibir Fornecedores & Editar Fornecedores... */}
                <div ref={divForncLoad} onDoubleClick={(e) => {
                    const target = e.target.closest('#--d-fornc');

                    if(target) {
                        const index = Array.from(divForncLoad.current.children).indexOf(target);
                        changeForncMenu__(index);
                    }
                }}>
                    <div ref={divForncLoad}>
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
                            </div>
                        ))}
                    </div>
                </div>
            {/* */}
        </>
    )
}

export default ForncMain;