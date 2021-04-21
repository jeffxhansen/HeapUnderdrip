<template>
  <div id="app">
    <div class="header">
      <div id="logo">
        <img style="width: 300px; height: 70px;" src="@/assets/heap-underdrip-logo.png">
      </div>
      <div id="nav">
        <div v-if="isLoggedIn"><router-link to="/login">Logout</router-link> |</div>
        <div v-else><router-link to="/login">Login/Register</router-link> |</div>
        <router-link to="/newQuestions">Questions</router-link> |
        <router-link to="/ask">Ask a Question</router-link>
      </div>
    </div>

    <div class="content">
      <router-view />
    </div>

    <div class='footer'>
      <div class='footer-item footer-one'>
        <p>@2021<br>By: Jeff Hansen</p>
      </div>
      <div class='footer-item footer-two'>
        <img id='signature' src='@/assets/signature.png'>
      </div>
      <div class='footer-item footer-three'>
        <p>my <a href='https://github.com/jeffxhansen/HeapUnderdrip.git'>Github</a> Repo</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HomePage',
    computed: {
        isLoggedIn() {
            if (this.$root.$data.user === null) return false;
            else return true;
        },
        currUser() {
            return this.$root.$data.user.username;
        }
    }
}
</script>


<style>

.header {
  display: flex;
  flex-direction: row;
  align-content: center;
  padding-left: 20px;
  padding-top: 20px;
  box-shadow: 0 6px 8px -2px rgb(12 13 14 / 15%);
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-left: auto;
  margin-right: 40px;
  padding: 30px;
  display: flex;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 14px;
}

#nav a.router-link-exact-active {
  color: #0070c0;
}




form {
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  display: table;
  margin-left: 16px;
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

/* FOOTER
---------------------------------------- */
.footer {
    margin-top: 80px;
    margin-bottom: 0;
    flex-shrink: 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
}

.footer img {
    width: 60%;
}
  
.footer-item {
    padding: 10px 40px;
    align-items: center;
}

.footer-item a {
    font-weight: bolder;
    color: black;
}

/* Tablet Styles */
@media only screen and (min-width: 300px) and (max-width: 750px) {
    .topics-grid {
        width: 100%;
    }
      
    .selection {
        width: 200px;
    }

    .response {
        width: 90%;
    }

    .header {
      flex-direction: column;
    }

    #nav {
      margin: 0 auto;
    }

    #logo {
      height: 50;
      width: 200;
    }
}
</style>
