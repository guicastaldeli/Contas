import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Imports
  import MainPage from './main-page-src/main-page';

  //Pages
    import ContasMain from './contas-scr/main-contas';
    import ForncMain from './fornc-scr/main-fornc';
  //
//

const root = ReactDOM.createRoot(document.getElementById('root'));

//Render...
  root.render(
    <Router>
      <Routes>
        {/* Main */}
        <Route path='/' element={<MainPage />} />

        {/* Contas & Fornecedores... */}
          <Route path='/contas' element={<ContasMain />} />
          <Route path='/fornc' element={<ForncMain />} />
        {/* */}
      </Routes>
    </Router>
  );
//