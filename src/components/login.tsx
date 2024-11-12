import axios from 'axios';
import React, { FormEvent, useRef } from 'react';

function Login() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (usernameRef.current && passwordRef.current) {
            var userForm = { username: usernameRef.current.value, password: passwordRef.current.value };
            axios.post("http://localhost:5174/users", userForm)
                .then((response) => {
                    console.log(response);
                    sessionStorage.setItem("token", response.data.token);
                }).catch(error => {
                    console.error(error);
                });
        }
    }

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <label className="form-label">Username:</label>
            <input className="form-control" ref={usernameRef} type="text" id="inputUsername" />
            <label className="form-label">Password:</label>
            <input className="form-control" ref={passwordRef} type="password" id="inputPassword" />
            <button className="btn btn-primary" type="submit">Login</button>
        </form>

    );
}

export default Login;