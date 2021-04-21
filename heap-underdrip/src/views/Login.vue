<template>
<div class = "wrapper">
    <router-link style="margin-top: 20px" to="/newQuestions">Back</router-link>
    <div v-if="isLoggedIn">
        <p class="successMessage">Logged in as {{currUser}}</p>
        <button class="replyButton" v-on:click.prevent="logout()">Logout</button>
    </div>
    <div v-else>
        <div class = "question">
            <h2>Login</h2>
            <div class="ask-forum">
                <div class="search">
                    <form class="pure-form">
                        <i class="fas fa-search"></i><input v-model="usernameLogin" placeholder="Username: "/>
                    </form>
                </div>
                <div class="search">
                    <form class="pure-form">
                        <i class="fas fa-search"></i><input v-model="passwordLogin" placeholder="Password: "/>
                    </form>
                </div>
                <p class="successMessage" v-if="loginSuccess">{{loginSuccess}}</p>
                <p class="errorMessage" v-if="errorLogin">{{errorLogin}}</p>
                <button class="replyButton" v-on:click.prevent="login()">Login</button>
            </div>
            <div class="content"></div>
            <h2>Register a New Account</h2>
            <div class="ask-forum">
                <div class="search">
                    <form class="pure-form">
                        <i class="fas fa-search"></i><input v-model="firstName" placeholder="First Name: "/>
                    </form>
                </div>
                <div class="search">
                    <form class="pure-form">
                        <i class="fas fa-search"></i><input v-model="lastName" placeholder="Last Name: "/>
                    </form>
                </div>
                <div class="search">
                    <form class="pure-form">
                        <i class="fas fa-search"></i><input v-model="username" placeholder="Username: "/>
                    </form>
                </div>
                <div class="search">
                    <form class="pure-form">
                        <i class="fas fa-search"></i><input v-model="password" placeholder="Password: "/>
                    </form>
                </div>
                <p class="successMessage" v-if="registerSuccess">{{registerSuccess}}</p>
                <p class="errorMessage" v-if="error">{{error}}</p>
                <button class="replyButton" v-on:click.prevent="register()">Register</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HomePage',
    data() {
        return {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            usernameLogin: '',
            passwordLogin: '',
            error: '',
            errorLogin: '',
            loginSuccess: '',
            registerSuccess: '',
        }
    },
    computed: {
        isLoggedIn() {
            if (this.$root.$data.user === null) return false;
            else return true;
        },
        currUser() {
            return this.$root.$data.user.username;
        }
    },
    methods: {
        async register() {
            this.error = '';
            this.errorLogin = '';
            this.loginSuccess = '';
            this.registerSuccess = '';
            if (!this.firstName || !this.lastName || !this.username || !this.password)
                return;
            try {
                let response = await axios.post('/api/users', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password,
                });
                this.$root.$data.user = response.data.user;
                this.registerSuccess = "Successfully registered " + this.username;
            } catch (error) {
                this.error = error.response.data.message;
                this.$root.$data.user = null;
            }
        },
        async login() {
            this.error = '';
            this.errorLogin = '';
            this.loginSuccess = '';
            this.registerSuccess = '';
            if (!this.usernameLogin || !this.passwordLogin)
                return;
            try {
                let response = await axios.post('/api/users/login', {
                    username: this.usernameLogin,
                    password: this.passwordLogin,
                });
                this.$root.$data.user = response.data.user;
                this.loginSuccess = "Successfully logged in " + this.usernameLogin;
            } catch (error) {
                this.errorLogin = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        },
        async logout() {
            try {
                await axios.delete("/api/users");
                this.$root.$data.user = null;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
    }
}
</script>

<style scoped>
form {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 70%;
    display: table;
    margin: 4px auto;
}

i {
    display: table-cell;
    width: 1px;
}

input {
    display: table-cell;
    font-size: 16px;
    border: none !important;
    box-shadow: none !important;
    width: 100%;
    height: 30px;
}

::placeholder {
    color: #aaa;
}

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}

.question {
    display: flex;
    border-radius: 15px;
    background-color: #eeeeee;
    padding: 10px 10px;
    margin: 20px auto;
    width: 600px;
    flex-direction: column;
    justify-content: center;
    align-content: center;;
}

.content {
    display: block;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    width: 90%;
}

.content:after {
    content: "";
    display: block;
    margin: 10px auto;
    width: 90%;
    border-bottom: 1px solid black;
}

.content h2 {
    text-align: center;
    color: #005796;
}

.replyButton {
    background-color: #4096d3ab;
    margin-top: 8px;
    border: none;
    border-radius: 10px;
    height: 40px;
    width: 70px;
    font-style: none;
}

#replyButton {
  background-color: #4096d3ab;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 70px;
  font-style: none;
}

.editButton {
  background-color: #4096d365;
  border: none;
  border-radius: 10px;
  height: 30px;
  width: 40px;
  font-style: none;
}

.info button:hover {
  background-color: hsla(205, 63%, 54%, 0.549);
}

#resolve {
  background-color: #bd3c3cab;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 70px;
}

#resolve:hover {
  background-color: #bd3c3c8e;
}

.errorMessage {
    color: rgb(182, 0, 0);
    font-style: italic;
}

.successMessage {
    color: #005796;
    font-style: italic;
}



/* Tablet Styles */
@media only screen and (min-width: 350px) and (max-width: 500px) {
  #question {
    width: 300px;
  }

  .reply-dropdown-item {
    width: 300px;
  }
  .edit-dropdown-item {
    width: 300px;
  }
}
@media only screen and (min-width: 501px) and (max-width: 600px) {
  #question {
    width: 400px;
  }
  .reply-dropdown-item {
    width: 400px;
  }
  .edit-dropdown-item {
    width: 400px;
  }
}
@media only screen and (min-width: 601px) and (max-width: 700px) {
  #question {
    width: 500px;
  }
}
</style>