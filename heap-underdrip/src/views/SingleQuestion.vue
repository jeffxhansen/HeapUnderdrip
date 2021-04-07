<template>
    <div class = "wrapper">
        <router-link style="margin-top: 20px" to="/newQuestions">Back</router-link>
        <div v-if="empty">
          <h3>This question has been removed, please return to the questions page</h3>
        </div>
        <div v-else>
          <div class="question">
              <div class="content">
                  <h4>{{title}}</h4>
                  <p>{{body}}</p>
              </div>
              <div class="info">
                  <p>Topic: {{topic}}</p>
                  <p>Date: {{date}}</p>
                  <button v-on-clickaway="" v-on:click="showDropdown()" class="replyButton dropbtn">Add Reply</button>
                  <div id="myDropdown" class="dropdown-content">
                      <div class="reply-dropdown-item">
                      <form class="pure-form">
                          <i class="fas fa-search"></i><input v-model="username" placeholder="Name: "/>
                      </form>
                      </div>
                      <div class="reply-dropdown-item">
                      <form class="pure-form">
                          <i class="fas fa-search"></i><input v-model="replyContent" placeholder="Reply content: "/>
                      </form>
                      </div>
                      <button class="replyButton" v-on:click="addReply()">submit</button>
                  </div>
                  <button v-on:click="removeQuestion()" id="resolve">Resolve Question</button>
              </div>
              <div class="replies" v-for="(reply, index) in replies" :key="reply.id">
                  <div class="reply">
                      <p>{{reply.text}}</p>
                  </div>
                  <div class="info">
                      <p>Name: {{reply.username}}</p>
                      <p>Date: {{reply.date}}</p>
                      <button v-on-clickaway="" v-on:click="showEditDropdown(index)" class="editButton dropbtn">Edit</button>
                      <div class="myEditDropdown edit-dropdown-content">
                          <div class="edit-dropdown-item">
                          <form class="pure-form">
                              <i class="fas fa-search"></i><input v-model="editName" placeholder="New name: "/>
                          </form>
                          <form class="pure-form">
                              <i class="fas fa-search"></i><input v-model="editContent" placeholder="New text: "/>
                          </form>
                          </div>
                          <button class="replyButton" v-on:click="addEdit(index, reply._id)">submit</button>
                      </div>
                  </div>
              </div>
              <!-- <p>{{responseStuff}}</p> -->
          </div>
        </div>

    </div>
    
</template>

<script>
import moment from 'moment';
import axios from 'axios'
export default {
    name: 'SingleQuestion',
    data() {
        return {
            question: '',
            questionID: '',
            username: '',
            replyContent: '',
            editContent: '',
            editName: '',
            replies: []
        }
    },
    created() {
        this.questionID = this.$route.query.questionID;
        this.question = this.getQuestion();
        this.replies = this.getReplies();
        console.log(this.questionID);
    },
    methods: {
        async removeQuestion() {
          try {
            await axios.delete(`/api/questions/${this.thisText}`);
            this.question = this.getQuestion();
            this.replies = this.getReplies();
          }
          catch (error) {
            console.log(error);
          }
        },
        async getQuestion() {
            try {
                console.log(`/api/questions/${this.thisText}`);
                const response = await axios.get(`/api/questions/${this.thisText}`);
                this.question = response.data.question;
            } catch (error) {
                console.log(error);
            }          
        },
        async getReplies() {
            console.log(`/api/questions/${this.thisText}/replies`);
            const response = await axios.get(`/api/questions/${this.thisText}/replies`)
            this.replies = response.data;
        },
        showDropdown() {
            document.getElementById("myDropdown").classList.toggle("show");
        },
        showEditDropdown(index) {
            console.log("entered the showEditDropdown method");
            document.getElementsByClassName("myEditDropdown")[index].classList.toggle("show");
        },
        async addReply() {
            try {
                let currDate = new Date();
                currDate = moment(currDate).format("MMMM Do YY, h:mm a");

                await axios.post(`/api/questions/${this.thisText}/replies`, {
                    question: this.question,
                    username: this.username,
                    text: this.replyContent,
                    date: currDate
                });

                document.getElementById("myDropdown").classList.toggle("show");

                this.question = this.getQuestion();
                this.replies = this.getReplies();
            } catch (error) {
                console.log(error);
            }
        },
        async addEdit2(index, id) {
            console.log(id);

            try {
              console.log("SUUUUUP" + index + ", " + id);
              //let currDate = new Date();
              //currDate = moment(currDate).format("MMMM Do YY, h:mm a");

              await axios.put(`/api/questions/${this.thisText}/replies/${id}`, {
                  question: this.question,
                  username: "newUsername",
                  text: "newText",
                  date: "newDate"
              });
            } catch (error) {
                console.log(error);
            }

            document.getElementsByClassName("myEditDropdown")[index].classList.toggle("show");
        },
        async addEdit(index, id) {
            try {
                console.log("SUUUUUP" + index + ", " + id);
                let currDate = new Date();
                currDate = moment(currDate).format("MMMM Do YY, h:mm a");

                await axios.put(`/api/questions/${this.thisText}/replies/${id}`, {
                    question: this.question,
                    username: this.editName,
                    text: this.editContent,
                    date: currDate
                });

                document.getElementsByClassName("myEditDropdown")[index].classList.toggle("show");
                this.question = this.getQuestion();
                this.replies = this.getReplies();            
            
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        title() {
            return this.question.title;
        },
        body() {
            return this.question.body;
        },
        topic() {
            return this.question.topic;
        },
        date() {
            return this.question.date;
        },
        thisText() { return this.questionID; },
        responseStuff() {
            return this.replies;
        },
        empty() {
          if (this.question == "[object Promise]") return true;
          else return false;
            //if (this.question == null) return 0;
            //else return 1;
        }
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

.question {
  border-radius: 15px;
  background-color: #eeeeee;
  padding: 10px 10px;
  margin: 20px auto;
  width: 600px;
}

.content {
  display: blcok;
  flex-direction: column;
  margin-left: 20px;
  margin-right: auto;
  text-align: left;
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
