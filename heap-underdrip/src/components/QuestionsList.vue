<template>
<div class="wrapper">
  <div v-for="question in questions" :key="question.id">
    <div id="question">
      <div class="content">
        <h4>{{question.title}}</h4>
        <p>{{question.body}}</p>
      </div>
      <div class="info">
        <p>Topic: {{question.topic}}</p>
        <p>Date: {{question.date}}</p>
        <p>Replies: {{question.responses.length}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'QuestionsList',
  props: {
    questions: Array
  }
}
</script>

<style scoped>
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

  cursor: pointer;
}

.content {
  display: blcok;
  flex-direction: column;
  margin-left: 20px;
  margin-right: auto;
  text-align: left;

  
}

#question:hover {
    background-color: #f2f2f2;
}

.content p {
  padding-left: 4px;
}

.info {
  display: flex;
  align-content: flex-start;
  flex-direction: row;
  justify-content: space-around;
}

.info button {
  background-color: #4096d3ab;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 70px;
}

.info button:hover {
  background-color: #4096d38c;
}

.content:after {
  content: "";
  display: block;
  margin: 10px auto;
  width: 90%;
  border-bottom: 1px solid black;
}

/* Tablet Styles */
@media only screen and (min-width: 350px) and (max-width: 500px) {
  #question {
    width: 300px;
  }
}
@media only screen and (min-width: 501px) and (max-width: 600px) {
  #question {
    width: 400px;
  }
}
@media only screen and (min-width: 601px) and (max-width: 700px) {
  #question {
    width: 500px;
  }
}
</style>