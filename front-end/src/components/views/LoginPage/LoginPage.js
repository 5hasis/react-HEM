import React, { useState } from 'react';

function LoginPage(){

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Email</label>
                <input type="email" value={Email} />
                <label>Password</label>
                <input type="password" value={Password} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage