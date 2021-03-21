<template>
  <div class="topics">
    <h1>Welcom to my "completely original" forum website!</h1>
    <h3>Click on a topic below to browse related questions!</h3>
    <div class="wrapper">
      <div class="topics-grid">
        <div class="topic" v-for="topic in topics" :key="topic.name">
          <router-link to="/questions" v-on:click="setFilter(topic.name)" class='selection noSelect'>
            <span>
              <h2>{{topic.name}}</h2>
              <h5>Questions: {{ topic.numQuestions }}</h5>
            </span>
          </router-link>
        </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topics',
  methods: {
    setFilter(name) {
      this.$root.$data.topicFilter = name;
    }
  },
  computed: {
    topics() {
      return this.$root.$data.topics;
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #F2921D;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}

.topics-grid {
    margin: 30px 0px;
    width: 80%;
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
    align-items: center;

    flex-direction: row;
}
  
.selection {
    /* border: solid 2px red; */
    display: flex;
    align-content: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    margin: 10px 10px;
    background-color: #ffffff;
    flex-direction: column;

    text-decoration: none;
    color: black;

    cursor: pointer;

    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.selection:hover {
    background-color: #dbf0ff28;
}

.selection h2 {
  margin-top: 20px;
  margin-bottom: -10px;
}

.selection h5:before {
  content: "";
  display: block;
  margin: 10px auto;
  width: 50%;
  border-bottom: 1px solid black;
}

.noSelect {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>

