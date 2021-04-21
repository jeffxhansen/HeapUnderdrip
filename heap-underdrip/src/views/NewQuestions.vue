<template>
  <div class="questions">
    <h1>Welcome to my "completely original" forum website!</h1>
    <h3>Type in values in the "Topic Filter" or "Search Quesitons" forms to filter the questions</h3>
    <h4>And please feel free to <a><router-link to="/ask">"Ask a Question"</router-link></a> or reply to a question below!</h4>
    <!-- <h1>All Questions</h1> -->
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="topicFilter" placeholder="Topic Filter"/>
      </form>
    </div>
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" placeholder="Search Questions"/>
      </form>
    </div>
    <div class="wrapper">
      <div v-for="question in filteredQuestions" :key="question.id">
          <div id="question">
            <router-link class="question-link" :to="{ path: '/singleQuestion', query: { questionID: question.id } }">
              <div class="content">
                <h4>{{question.title}}</h4>
                <p>{{question.body}}</p>
              </div>
            </router-link>
            <div class="info">
              <p>Topic: {{question.topic}}</p>
              <P>Name: {{question.username}}</p>
              <p>Date: {{question.date}}</p>
              <div v-if="question.username===currUser">
                <button v-on:click="removeQuestion(question.id)" id="resolve">Resolve Question</button>
              </div>
            </div>
            <router-link class="replies-link" :to="{ path: '/singleQuestion', query: { questionID: question.id } }">Replies...</router-link>
            <!-- <div class="replies" v-for="reply in getReplies(question.id)" :key="reply.id">
              <p>{{reply.id}}}</p>
            </div> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'NewQuestions',
  data () {
    return {
      searchText: '',
      topicFilter: '',//this.$root.$data.topicFilterGlobal,
      userName: '',
      replyContent: '',
      editContent: '',
      editName: '',
      dbQuestionID: '',
      dbQuestions: [],
      dbReplies: []
    }
  },
  created() {
    this.getQuestions();
    this.dbQuestionID = this.thisQuestionID;
  },
  methods: {
    async getQuestions() {
      try {
        const response = await axios.get("/api/questions");
        this.dbQuestions = response.data.questions;
        console.log(this.dbQuestions);
      }
      catch (error) {
        console.log(error);
      }
    },
    showDropdown(index) {
      document.getElementsByClassName("myDropdown")[index].classList.toggle("show");
    },
    showEditDropdown(questionIndex, replyIndex) {
      let index = 0;
      let counter = 0;
      for (let question of this.$root.$data.questions) {
        for (let reply of question.responses) {
          if (question.id === questionIndex && reply.id === replyIndex) index = counter;
          else counter++;
        }
      }
      let elements = document.getElementsByClassName("myEditDropdown");
      console.log(elements);
      document.getElementsByClassName("myEditDropdown")[index].classList.toggle("show");
    },
    decrementTopic(name) {
      for (let i = 0; i < this.$root.$data.topics.length; i++) {
        if (name === this.$root.$data.topics[i].name) {
          this.$root.$data.topics[i].numQuestions--;
          break;
        }
      }
    },
    async removeQuestion(index) {
      try {
        await axios.delete(`/api/questions/${index}`);
        this.getQuestions();
      }
      catch (error) {
        console.log(error);
      }
    },
    addReply(index) {
      for (let i = 0; i < this.$root.$data.questions.length; i++) {
        if (index === this.$root.$data.questions[i].id) {
          let tempID = this.$root.$data.questions[i].responses.length;
          let currDate = new Date();
          currDate = moment(new Date()).format("MMMM Do YY, h:mm a");
          this.$root.$data.questions[i].responses.push({id: tempID, text: this.replyContent, 
          username: this.userName, date: currDate})
          break;
        }
      }
      document.getElementsByClassName("myDropdown")[index].classList.toggle("show");
    },
    addEdit(questionIndex, replyIndex) {
      let index = 0;
      let counter = 0;
      for (let question of this.$root.$data.questions) {
        for (let reply of question.responses) {
          if (question.id === questionIndex && reply.id === replyIndex) {
            index = counter;
            reply.text = this.editContent;
            reply.username = this.editName;
            let currDate = new Date();
            currDate = moment(new Date()).format("MMMM Do YY, h:mm a");   
            reply.date = currDate;        
          }
          else counter++;
        }
      }
      this.editContent = '';
      this.editName = '';
      /*for (let i = 0; i < this.$root.$data.questions.length; i++) {
        if (questionIndex === this.$root.$data.questions[i].id) {
          for (let j = 0; j < this.$root.$data.questions[i].responses.length; j++) {
            if (replyIndex === this.$root.$data.questions[i].responses[j].id) {
              this.$root.$data.questions[i].responses[j].text = this.editContent;
              this.$root.$data.questions[i].responses[j].username = this.editName;
              let currDate = new Date();
              currDate = moment(currDate).format("MMMM Do YY, h:mm a");
              this.$root.$data.questions[i].responses[j].date = currDate;
            }
          }
          break;
        }
      }*/
      document.getElementsByClassName("myEditDropdown")[index].classList.toggle("show");
    },
  },
  /*showEditDropdown(questionIndex, replyIndex) {
    let index = questionIndex;
    index = replyIndex;
    let elements = document.getElementsByClassName("myEditDropdown");
    console.log(elements);
    document.getElementsByClassName("myEditDropdown")[index].classList.toggle("show");
  },*/
  async getQuestions() {
    try {
      const response = await axios.get("/api/questions");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    isAuthorized(questionName) {
      console.log("questionName: " + questionName);
      console.log("currUser: " + this.$root.$data.user.username);
      if (questionName === this.$root.$data.user.username) return true;
      else return false;
    },
    currUser() {
      return this.$root.$data.user.username;
    },
    filteredQuestions() {
      return this.dbQuestions.filter(question => 
        question.title.toLowerCase().search(this.searchText.toLowerCase()) >= 0 && 
        question.topic.toLowerCase().search(this.topicFilter.toLowerCase()) >= 0);
    },
    // async getReplies(id) {
    //   const response = await axios.get(`/api/questions/${id}/replies`);
    //   return response.data;
    // },
    thisQuestionID() {
        return "Hello World!";
    },
    questions() {
      let topicString = this.$root.$data.topicFilterGlobal;
      //let questions = this.getQuestions();
      //console.log(questions);
      return this.$root.$data.questions.filter(question => 
        question.title.toLowerCase().search(this.searchText.toLowerCase()) >= 0 && 
        question.title.toLowerCase().search(topicString.toLowerCase()) >= 0 && 
        question.topic.toLowerCase().search(this.topicFilter.toLowerCase()) >= 0);
      /*if (this.$root.$data.topicFilterGlobal != "") {
        let topicString = this.$root.$data.topicFilterGlobal;
        return this.$root.$data.questions.filter(question => 
          question.title.toLowerCase().search(topicString.toLowerCase()) >= 0);
      }
      else {
        return this.$root.$data.questions.filter(question => 
        question.title.toLowerCase().search(this.searchText.toLowerCase()) >= 0 && 
        question.topic.toLowerCase().search(this.topicFilter.toLowerCase()) >= 0);
      }*/
    },
  }
}
</script>

<style scoped>
.dropbtn {
  background-color: #4096d3ab;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 70px;
  font-style: none;
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
  min-width: 300px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
}

.edit-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 300px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.reply-dropdown-item {
  width: 500px;
}

.edit-dropdown-item {
  width: 500px;
}

.show {display: block;}

form {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 70%;
  display: table;
  margin: 20px auto;
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

#question {
  border-radius: 15px;
  background-color: #eeeeee;
  padding: 10px 10px;
  margin: 8px auto;
  width: 600px;
}

#question:hover {
  background-color: #f1f1f1;
}

.content {
  display: blcok;
  flex-direction: column;
  margin-left: 20px;
  margin-right: auto;
  text-align: left;

  cursor: pointer;
}

.content:after {
  content: "";
  display: block;
  margin: 10px auto;
  width: 90%;
  border-bottom: 1px solid black;
}

.content p {
  padding-left: 4px;
}

.replies {
  border-radius: 15px;
  background-color: #f9f9f9;
}

.reply {
  display: blcok;
  flex-direction: column;
  padding: 2px 0px;
  margin: 4px auto;
  margin-left: 20px;
  margin-right: auto;
  text-align: left;
  
}

.reply p {
  padding-left: 4px;
}

.reply:after {
  content: "";
  display: block;
  margin: 10px auto;
  width: 90%;
  border-bottom: 1px solid #bbbbbb;
}

.info {
  display: flex;
  align-content: flex-start;
  flex-direction: row;
  justify-content: space-around;

  font-size: small;
  font-style: italic;
}

.replyButton {
  background-color: #4096d3ab;
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
  background-color: #4096d38c;
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

.question-link {
  text-decoration: none;
  color: black;
}

.replies-link {
  color: #20699cfd;
}

.replies-link:hover {
  color: #4096d38c;
}

.replies-link:visited {
  color: #20699cfd;
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
