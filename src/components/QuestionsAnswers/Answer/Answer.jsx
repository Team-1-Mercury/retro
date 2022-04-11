import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { questionsStore } from '../../../stores.js';
import { MoreAnswersButton } from '../index.js';
import './Answer.scss';

function Answer({ questionObj }) {
  // const setAnswers = questionsStore((state) => state.setAnswers);
  const allQuestions = questionsStore((state) => state.questions);
  const setQuestions = questionsStore((state) => state.setQuestions);

  function intialMaxAnswers(questions) {
    // create an empty arr
    const maxAnswers = [];
    // map over questions
    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i];
      if (question.question_id) {
        maxAnswers.push({ [question.question_id]: 2 });
      }
    }
    return maxAnswers;
  }

  // function getAllAnswers() {
  //   axios({
  //     url: `${process.env.URL}qa/questions/${questionObj.question_id}/answers`,
  //     method: 'GET',
  //     headers: {
  //       Authorization: process.env.GITHUB_API_KEY,
  //     },
  //   })
  //     .then((data) => {
  //       setAnswers(data.data.results);
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }

  // useEffect(() => {
  //   getAllAnswers();
  // }, []);

  const setMaxAnswersArr = questionsStore((state) => state.setMaxAnswersArr);

  useEffect(() => {
    setMaxAnswersArr(intialMaxAnswers(allQuestions));
  }, allQuestions);

  function answerSort(arr) {
    const final = [];
    const ascending = arr.sort((a, b) => b.helpfulness - a.helpfulness);

    for (let i = 0; i < ascending.length; i += 1) {
      if (ascending[i].answerer_name === 'Seller') {
        final.unshift(ascending[i]);
      } else {
        final.push(ascending[i]);
      }
    }
    return final;
  }

  const { id } = useParams();

  function handleHelpfulClick(answer) {
    axios({
      url: `${process.env.URL}qa/answers/${answer.id}/helpful`,
      method: 'PUT',
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
      },
    })
      .then(() => {
        axios({
          url: `${process.env.URL}qa/questions`,
          method: 'GET',
          headers: {
            Authorization: process.env.GITHUB_API_KEY,
          },
          params: {
            product_id: id,
            count: 100,
          },
        })
          .then((data) => {
            console.log('data', data);
            setQuestions(data.data.results);
          });
      });
  }

  function handleKeyPress(event, answer) {
    if (event.key === 'Enter') {
      // call upadting function here
      handleHelpfulClick(answer);
    }
  }

  const maxAnswersArr = questionsStore((state) => state.maxAnswersArr);

  function mapAnswers(answersObj) {
    const answerObjsArr = Object.values(answersObj);

    return answerSort(answerObjsArr).map((answer, index) => {
      const questionId = questionObj.question_id;

      for (let i = 0; i < maxAnswersArr.length; i += 1) {
        const maxAnswer = maxAnswersArr[i];
        if (index < maxAnswer[questionId]) {
          return (
            <div key={answer.id}>
              <div>
                <span className="qa-answer-tag">A:</span>
                <span className="qa-answer-body">{`${answer.body}`}</span>
              </div>
              <div className="qa-sub-answer-parts-container">
                <div className="qa-sub-answer">
                  {`by ${answer.answerer_name} ${answer.date.slice(0, 10)} |`}
                </div>
                <div className="qa-sub-answer helpful">Helpful?</div>
                <div
                  className="qa-sub-answer yes"
                  role="button"
                  tabIndex={0}
                  onKeyPress={() => (handleKeyPress(answer))}
                  onClick={() => (handleHelpfulClick(answer))}
                >
                  {`Yes(${answer.helpfulness})`}
                </div>
                <div className="qa-sub-answer">| Report</div>
              </div>
            </div>
          );
        }
      }
      return <div key={answer.id} />;
    });
  }

  return (
    <div className="qa-answer-container">
      {mapAnswers(questionObj.answers)}
      <MoreAnswersButton questionObj={questionObj} />
    </div>
  );
}

export default Answer;
