import React from 'react';
    const Header = ({ toggleTableVisibility }) => {
        return(
            <header>
                <div class="flex justify-center header-container" >
                    <div class="flex flex-col text-center">
                        <h1 className="text-4xl text-white font-mono">
                            Problem 2: Fancy Form
                        </h1>
                        <h2 className="text-1xl  font-mono">
                            Switcheo Coding Challenge #1
                        </h2>
                        <h2 className="text-1xl  font-mono">
                            (Done By: Ng Yu Hueng)
                        </h2>
                        <button onClick={toggleTableVisibility} className="toggle-button">
                            <p className='button-text'>List of Currency Available</p>
                        </button>
                    </div>
                </div>
            </header>
        );
    }


export default Header