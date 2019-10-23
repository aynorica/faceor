import React from 'react';
import { connect } from 'react-redux';
import { loadRegisterEmail, loadRegisterPassword, loadRegisterName } from "../../containers/actions";

const mapStateToProps = (state) => {
    return {
        email: state.registerInfo.email,
        password: state.registerInfo.password,
        name: state.registerInfo.name
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNameChange: (event) => dispatch(loadRegisterName(event.target.value)),
        onEmailChange: (event) => dispatch(loadRegisterEmail(event.target.value)),
        onPasswordChange: (event) => dispatch(loadRegisterPassword(event.target.value))
    }
};

class Register extends React.Component {

    onSubmitSignIn = () => {
        const { email, password, name, loadUser, onRouteChange } = this.props;
        fetch('https://damp-retreat-33615.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange('home');
                }
            })
    };

    render() {
        const { onNameChange, onEmailChange, onPasswordChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);