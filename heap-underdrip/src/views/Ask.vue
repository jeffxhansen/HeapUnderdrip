<template>
<div class="ask">
  <h1>Ask a question form</h1>
  <div class="wrapper">
    <div v-if="creating">
      <div class="ask-forum">
        <div class="search">
          <form class="pure-form">
            <i class="fas fa-search"></i><input v-model="filter" placeholder="Topic: "/>
          </form>
        </div>
        <div class="search">
          <form class="pure-form">
            <i class="fas fa-search"></i><input v-model="name" placeholder="Name: "/>
          </form>
        </div>
        <div class="search">
          <form class="pure-form">
            <i class="fas fa-search"></i><input v-model="title" placeholder="Question title: "/>
          </form>
        </div>
        <div class="search">
          <form class="pure-form">
            <i class="fas fa-search"></i><input v-model="body" placeholder="Question body: "/>
          </form>
        </div>
        <button id="questionSubmit" v-on:click.prevent="addQuestion()">Submit</button>
      </div>
    </div>
    <div v-else>
      <p>Thank you for submitting a question! The <router-link to="/questions">"Questions"</router-link> page has been update, and you can see it there!</p>
      <p>Also, if you selected a topic that was not already present, it has been added to the <router-link to="/">"Topics"</router-link> page!</p>
      <p>Finally, if you want to submit another questions just select <a v-on:click="refreshPage()"><router-link to="/ask">"Ask a Question"</router-link></a></p>
    </div>

  </div>
</div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Ask',
  data() {
    return {
      creating: true,
      filter: '',
      name: '',
      title: '',
      body: ''
    }
  },
  methods: {
    showMenu() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
    isATopic(value) {
      for (let i = 0; i < this.$root.$data.topics.length;i++) {
        if (value === this.$root.$data.topics[i].name) {
          return true;
        }
      }
      return false;
    },
    addTopic(topic) {
      this.$root.$data.topics.push({name: topic, numQuestions: 0});
    },
    incrementQuestionCount(topic) {
      for (let i = 0; i < this.$root.$data.topics.length;i++) {
        if (topic === this.$root.$data.topics[i].name) {
          this.$root.$data.topics[i].numQuestions++;
        }
      }
    },
    refreshPage() {
      //console.log("refreshed the page");
      this.creating = !this.creating;
      //this.$router.go();
    },
    toggleCreating() {
      this.creating = !this.creating;
    },
    addQuestion() {
      let size = this.$root.$data.questions.length;
      let tempID = size+1;
      let currDate = new Date();
      currDate = moment(currDate).format("MMMM Do YY, h:mm a");
      let responses = [];
      let question = {id: tempID, topic: this.filter, date: currDate, title: this.title,
      body: this.body, responses: responses};

      if (!this.isATopic(this.filter)) {
        this.addTopic(this.filter);
      }

      this.$root.$data.questions.push(question);
      this.incrementQuestionCount(this.filter);
       
      this.toggleCreating();
      
    }
  },
  computed: {
    topics() {
      return this.$root.$topics;
    }
  }
}
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content*/



// Close the dropdown if the user clicks outside of it

</script>

<style scoped>


.wrapper {
  display: flex;
  margin: 10px auto;
  padding: 10px 10px;
  align-content: center;
  justify-content: center;
  width: 90%;
  background-color: #f5f5f5f5;
  border-radius: 25px;
}

.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 8px 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}

.search {
  display: flex;
  align-content: center;
  justify-content: stretch;
}

form {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 600px;
  display: table;
  margin: 6px auto;
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

/* Tablet Styles */
@media only screen and (min-width: 350px) and (max-width: 500px) {
  form {
    width: 200px;
  }
}
@media only screen and (min-width: 501px) and (max-width: 600px) {
  form {
    width: 350px;
  }
}
@media only screen and (min-width: 601px) and (max-width: 700px) {
  form {
    width: 450px;
  }
}
</style>
