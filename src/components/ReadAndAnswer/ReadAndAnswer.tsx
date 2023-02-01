import { useState, useEffect } from "react";
import useAnswerQuestion from "./useAnswerQuestion";
import "./readAndAnswer.scss";
import { RegurgitatorCore } from "components/Regurgitator";
import { Content, SavesModel } from "components/Saves";
import { SaveButton } from "components/Saves";
import {
  contentRetrieval,
  saveContentToLocalStorage,
} from "components/utilities";
import ClearButton from "components/ClearButton";

const featureType = "readTextAndAnswerQuestion";

function ReadAndAnswer({}: any) {
  const [regurgitation, setRegurgitation]: any = useState([]);
  const [initialRegurgitation, setInitialRegurgitation]: any = useState([]);
  const [showSaveModel, setShowSaveModel] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const { answer, setAnswer, question, setQuestion, setText, text, refresh } =
    useAnswerQuestion();

  const content: Content = {
    type: featureType,
    name: null,
    text,
    question,
    answer,
    regurgitation,
  };

  useEffect(initialize, []);

  useEffect(() => {
    if (!initialized) return;
    saveContentToLocalStorage(content);
  }, [content]);

  return (
    <div className="read_and_answer_container">
      {showSaveModel ? (
        <SavesModel
          onExit={() => {
            setShowSaveModel(false);
          }}
          content={content}
        />
      ) : (
        <></>
      )}
      <h5>Read text then answer question</h5>
      <label htmlFor="text">Text</label>
      <textarea
        id="text"
        rows={4}
        onChange={(e) => {
          const text = e?.target?.value;
          setText(text);
        }}
        defaultValue={text ? text : ""}
      />
      <label htmlFor="question">Question</label>
      <textarea
        id="question"
        onChange={(e) => {
          const text = e?.target?.value;
          setQuestion(text);
        }}
        defaultValue={question ? question : ""}
      />

      <button onClick={refresh}>Generate Answer</button>
      {answer ? (
        <>
          <label htmlFor="answer">Answer</label>
          <textarea id={`answer`} value={answer} rows={4} readOnly={true} />
          <h5>Plagiarism Protection</h5>
          <RegurgitatorCore
            target={answer.split(".")}
            onRegurgitationChange={(newRegurgitation: string[]) => {
              setRegurgitation(newRegurgitation);
            }}
            overideRegurgitation={initialRegurgitation}
          >
            <h5>Plagiarism Safe Answer</h5>
          </RegurgitatorCore>
        </>
      ) : (
        <></>
      )}
      <ClearButton
        onClick={() => {
          setText("");
          setQuestion("");
          setAnswer("");
          setRegurgitation([]);
        }}
      ></ClearButton>
      <SaveButton
        onClick={() => {
          setShowSaveModel(true);
        }}
      ></SaveButton>
    </div>
  );

  function initialize() {
    setText(contentRetrieval.getString("text", featureType));
    setQuestion(contentRetrieval.getString("question", featureType));
    setAnswer(contentRetrieval.getString("answer", featureType));
    const regurgitation = contentRetrieval.getStringArray(
      "regurgitation",
      featureType
    );
    setRegurgitation(regurgitation);
    setInitialRegurgitation(regurgitation);
    setInitialized(true);
  }
}

export default ReadAndAnswer;
