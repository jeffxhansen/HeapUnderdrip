import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import vSelect from 'vselect-component'
import moment from 'moment'

Vue.use(vSelect)
Vue.use(require("moment"));

moment.suppressDeprecationWarnings = true;

Vue.config.productionTip = false

let data = {
  topicFilterGlobal: '',
  searchid: 0, text: '',
  currTopic: '',
  currName: '',
  currDate: '',
  topics: [
    { name: 'java', numQuestions: 4 },
    { name: 'html', numQuestions: 4 },
    { name: 'css', numQuestions: 2 },
    { name: 'linux', numQuestions: 1 },
    { name: 'other', numQuestions: 4 }
  ],
  questions: [
    {
      id: 0,
      topic: "java",
      date: "March 20th 21, 9:29 pm",
      title: "What's the object-oriented way to become wealthy?",
      body: "Inheritance",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 1,
      topic: "java",
      date: "January 12th 21, 8:32 pm",
      title: "A user interface is like a joke.",
      body: "If you have to explain it then it is not that good.",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 2,
      topic: "java",
      date: "March 20th 21, 9:29 pm",
      title: "I was gonna tell you a joke about UDP...",
      body: "...but you might not get it.",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 3,
      topic: "java",
      date: "January 12th 21, 8:32 pm",
      title: "Which song would an exception sing?",
      body: "Can't catch me - Avicii",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 5,
      topic: "html",
      date: "January 12th 21, 8:32 pm",
      title: "How do you check if a webpage is HTML5?",
      body: "Try it out on Internet Explorer",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 6,
      topic: "html",
      date: "March 20th 21, 9:29 pm",
      title: "A SQL query walks into a bar, walks up to two tables and asks...",
      body: "'Can I join you?'",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 7,
      topic: "html",
      date: "January 12th 21, 8:32 pm",
      title: "Why did the programmer quit his job?",
      body: "Because he didn't get arrays.",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 8,
      topic: "html",
      date: "March 20th 21, 9:29 pm",
      title: "To understand what recursion is...",
      body: "You must first understand what recursion is",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 9,
      topic: "css",
      date: "March 20th 21, 9:29 pm",
      title: "How many programmers does it take to change a lightbulb?",
      body: "None that's a hardware problem",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 10,
      topic: "css",
      date: "January 12th 21, 8:32 pm",
      title: "The punchline often arrives before the set-up.",
      body: "Do you know the problem with UDP jokes?",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 11,
      topic: "linux",
      date: "March 20th 21, 9:29 pm",
      title: "There are 10 kinds of people in this world.",
      body: "Those who understand binary, those who don't, and those who weren't expecting a base 3 joke.",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 13,
      topic: "other",
      date: "March 20th 21, 9:29 pm",
      title: "A programmer puts two glasses on his bedside table before going to sleep.",
      body: "A full one, in case he gets thirsty, and an empty one, in case he doesn’t.",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 14,
      topic: "other",
      date: "January 12th 21, 8:32 pm",
      title: "What's the best thing about a Boolean?",
      body: "Even if you're wrong, you're only off by a bit.",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 15,
      topic: "other",
      date: "March 20th 21, 9:29 pm",
      title: "If you put a million monkeys at a million keyboards, one of them will eventually write a Java program",
      body: "the rest of them will write Perl",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    },
    {
      id: 16,
      topic: "other",
      date: "January 12th 21, 8:32 pm",
      title: "There are 10 types of people in this world...",
      body: "Those who understand binary and those who don't",
      responses: [
        { id: 0, text: "I think you are wrong", username: "Mr. Nasty", date: "March 17th 21, 6:04 pm" },
        { id: 1, text: "I think you are right", username: "Mr. NiceGuy", date: "April 17th 21, 6:05 pm" }
      ]
    }
  ],
}

new Vue({
  router,
  data,
  store,
  render: h => h(App)
}).$mount('#app')
