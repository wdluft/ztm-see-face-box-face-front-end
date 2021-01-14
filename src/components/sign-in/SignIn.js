/* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const SignIn = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({ errors: [] });

  const onSubmitSignIn = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setInputErrors(() => ({ errors: data.errors }));
        } else if (data.id) {
          loadUser(data);
          onRouteChange('home');
        }
      })
      .catch((err) => console.log(`Whoops, something went wrong!`));
  };

  return (
    <div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 white">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white white w-100"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </fieldset>
            {inputErrors.errors.map((error, i) => (
              <p key={`error-${i}`}>{error.msg}</p>
            ))}
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={(e) => onSubmitSignIn(e)}
              />
            </div>
            <div className="lh-copy mt3">
              <button
                className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"
                type="button"
                onClick={() => onRouteChange('register')}
              >
                Register
              </button>
            </div>
          </form>
        </main>
      </article>
    </div>
  );
};

export default SignIn;
