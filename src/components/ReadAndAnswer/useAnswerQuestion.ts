import { useState, useEffect } from "react";

const use_hard_coded_answer: boolean = false;
const hard_coded_answer: string = `Mother
Born in england.
Moved to texas.
Moved to Los Angeles.
Became the first in Family to Graduate College.
Became a Social worker.
Married my Dad.
Had me and my brother.
Got divorced with my Dad.
Dad
Born in Connecticut but was forced to be given up for adoption.
Graduated boston college.
Moved to Los Angeles.
Married my mom.
Divorced my mom.
Became a licenced theropist.
`;

function useAnswerQuestion() {
  const [answer, setAnswer]: any = useState(null);
  const [question, setQuestion]: any = useState();
  const [text, setText]: any = useState();
  const [update, setUpdate]: any = useState();

  const body = JSON.stringify({
    question,
    doc: text,
  });

  useEffect(() => {
    if (use_hard_coded_answer) {
      setAnswer(hard_coded_answer.split("."));
    }
  }, []);

  useEffect(() => {
    if (update === undefined) return;
    fetch(`https://Ant3ney.pythonanywhere.com`, {
      method: "post",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        /* const preAnswerBuffer = res[0].split(".");
        const answerBuffer = [];
        for (let i = 0; i < preAnswerBuffer.length; i++) {
          if (
            preAnswerBuffer[i] === null ||
            preAnswerBuffer[i] === "" ||
            preAnswerBuffer[i] === undefined
          )
            continue;
          answerBuffer.push(preAnswerBuffer[i]);
        } */

        setAnswer(res[0]);
      })
      .catch(console.error);
  }, [update]);

  function refresh() {
    setUpdate(update !== undefined ? !update : true);
  }

  return { answer, setAnswer, question, setQuestion, text, setText, refresh };
}

export default useAnswerQuestion;
