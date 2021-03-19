<template>
  <div id="app">
    <div class="header">
      <div id="logo">
        <img style="width: 300px; height: 70px;" src="@/assets/heap-underdrip-logo.png">
      </div>
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-search"></i><input v-model="searchText" />
        </form>
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
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
        <p>my <a href='https://github.com/jeffxhansen/TellMe.git'>Github</a> Repo</p>
      </div>
    </div>
  </div>
</template>


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

.header
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer {
    margin-top: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color:#fafafa;
}

.footer-item img {
  display: flex;
  align-self: center;
  width: 40%;
  margin: auto;
}

.footer-item p {
  text-align: center;
  line-height: 26px;
}
  
.footer-item {
  padding: 10px 40px;
  align-items: center;
}

.footer-item a {
  font-weight: bolder;
  color: black;
}


form {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  display: table;
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
  height: 40px;
}
</style>
