import React, {Component} from 'react';
import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

class SignUp extends Component {
    state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }



    handleSubmit = async e => {
        e.preventDefault();

        if(this.state.password !== this.state.confirmPassword){
            alert('password don`t match')
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            const { displayName } = this.state

            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        }catch(e){
            console.error('error ' + e.message)
        }

    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }


    render() {
        const { displayName, email, password, confirmPassword } = this.state


        return (
            <div className='sign-up'>
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='displayName'
                        type='text'
                        value={displayName}
                        handleChange={this.handleChange}
                        label='name'
                        required/>
                    <FormInput
                        name='email'
                        type='email'
                        value={email}
                        handleChange={this.handleChange}
                        label='email'
                        required/>
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='password'
                        required/>
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label='confirm password'
                        required/>
                    <div className="buttons">
                        <CustomButton type='submit'>Sign Up</CustomButton>
                    </div>
                </form>

            </div>
        );
    }
}

export default SignUp;
