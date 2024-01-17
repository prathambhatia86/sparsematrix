import React, { useState } from 'react';
import MerchantLogin from './MerchantLogin';
import MerchantSignup from './MerchantSignup';

const MerchantNameForm = () => {
    const [login, changeLogin] = useState(0);

    return (
        <form className="fade-in">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center mb-3">
                            <button
                                type="button"
                                className={`btn ${login === 0 ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => { changeLogin(0); }}
                                style={{ width: '40%', opacity: '85%' }}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className={`btn ${login >= 1 ? 'btn-success' : 'btn-secondary'}`}
                                onClick={() => { changeLogin(1); }}
                                style={{ width: '40%', opacity: '85%' }}
                            >
                                Sign up
                            </button>
                        </div>
                        {!login && <MerchantLogin />}
                        {login > 0 && <MerchantSignup changeLogin={() => { changeLogin(0) }} />}
                    </div>
                </div>
            </div>
        </form>

    );
};

export default MerchantNameForm;
