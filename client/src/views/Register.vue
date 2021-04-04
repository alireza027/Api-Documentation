<template>
    
    <div class="authentication">

        <div class="auth-container">

            <div class="auth-title-container">

                <h3 class="title">Register Page</h3>

            </div>

            <form class="auth-inputs" @submit.prevent="RegisterSection()">

                <div class="auth-input-container">

                    <label for="name-input" class="input-label">Name</label>

                    <input type="text" v-model="name" class="input" id="name-input" placeholder="please enter your name : " />

                </div>

                <div class="auth-input-container">

                    <label for="family-input" class="input-label">family</label>

                    <input type="text" v-model="family" class="input" id="family-input" placeholder="please enter your family : " />

                </div>

                <div class="auth-input-container">

                    <label for="email-input" class="input-label">Email</label>

                    <input type="email" v-model="email" class="input" id="email-input" placeholder="please enter your email : " />

                    <p class="auth-error" :class="emailError.length > 0 ? 'd-block' : 'd-none' ">{{ emailError }}</p>

                </div>


                <div class="auth-input-container">

                    <label for="password-input" class="input-label">Password</label>

                    <input type="password" v-model="password" class="input" id="password-input" placeholder="please enter your password : " />

                    <p class="auth-error" :class="passwordError.length > 0 ? 'd-block' : 'd-none' ">{{ passwordError }}</p>

                </div>

                <button type="submit" class="auth-button">Register</button>

                <router-link to="/login" class="send-to-other-section">Login To Account</router-link>

            </form>

        </div>

    </div>

</template>


<script>

import HasToken from '../middleware/hasToken';

    export default {

        data(){

            return { 

                email : "" ,

                emailError : "" ,

                password : "" ,

                passwordError : "" ,

                name : "" , 

                family : "" ,
                

             }

        },

        beforeCreate(){

            if( HasToken() == true ){

                this.$router.push('/');

            }

        },

        methods : {

            RegisterSection(){

                if( /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email) == false ){

                    this.emailError = "Your email address is invalid"
                    this.passwordError = "";
                    
                } else if ( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(this.password) == false ){

                    this.emailError = "";
                    this.passwordError = "Your password is invalid";

                } else {

                    this.emailError = "";
                    this.passwordError = "";

                    fetch('http://localhost:8000/auth/signup',{
                    
                        mode : "cors" ,

                        method : "POST" ,

                        body : JSON.stringify({ name : this.name , family : this.family , email : this.email , password : this.password }) , 

                        headers : {

                            "Content-Type":"application/json"

                        }


                    }).then( signinResponse => {

                        signinResponse.json().then( dataResponse => {

                            if(dataResponse.code == 400){

                                this.emailError = "This email has been used before";
                                this.passwordError = "";

                            } else {

                                this.$router.push('/login');

                            }
                            
                        } ).catch( error => {

                            console.log( "error In catch",error );

                        } )

                    } ).catch( error => {

                        console.log(error);

                    } )

                }

            }

        }

    }
</script>