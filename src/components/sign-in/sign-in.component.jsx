import React, {Component} from 'react';
import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signInWithGoogle, auth } from "../../firebase/firebase.utils";

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email, password } = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        }catch (e) {
            console.error(e.message)
        }

    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }


    render() {
        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='email'
                        required/>
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required/>
                        <div className="buttons">
                            <CustomButton type='submit'>Sign In</CustomButton>
                            <CustomButton
                                isGoogleSignIn
                                onClick={signInWithGoogle}>
                                Sign In With google
                            </CustomButton>
                        </div>
                </form>

            </div>
        );
    }
}

export default SignIn;
