import React, { useState } from 'react';
import Header from './Header.jsx';
import CurrencySwap from './CurrencySwap.jsx';
import Table from './Table.jsx';

function App() {
  const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <div>
      <Header toggleTableVisibility={toggleTableVisibility} />
      <div className={`flex ${isTableVisible ? 'flex-row justify-between' : 'justify-center'} flex-auto`}>
        {isTableVisible && (
          <div className="flex-1 mx-4">
            <Table />
          </div>
        )}
        <div className={`${isTableVisible ? 'flex-1' : ''} mx-4`}>
          <CurrencySwap />
        </div>
      </div>
    </div>
  );
}

export default App
