import '../styles/main-page-styles/main-page.css';
import { useNavigate } from 'react-router-dom';

//Import imgs...
import contasImg from '../assets/add-contas-max.png';
import forncImg from '../assets/add-fornc-max.png';

console.log(contasImg);

function MainPage() {
    //Redirects...
        const navigate = useNavigate();

        //Contas & Forncedores...
            function rdrctContas__() {
                navigate('/contas');
            }

            function rdrctFornc__() {
                navigate('/fornc');
            }
        //
    //
    
    return (
        <>
            {/* Contas */}
                <button id="r-c--" onClick={rdrctContas__}>
                    <img id='r-c-img--' src={contasImg} />

                    <p>Contas</p>
                </button>
            {/* */}

            {/* Fornecedores */}
                <button id='r-f--' onClick={rdrctFornc__}>
                    <img id='r-f-img--' src={forncImg} />

                    <p>Fornecedores</p>
                </button>
            {/* */}
        </>
    )
}

export default MainPage;