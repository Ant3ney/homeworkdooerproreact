import { useContext } from "react";
import savesContext from "./saveContext";
import { Content } from "./saveContext";
import { useNavigate } from "react-router-dom";
import loadSave from "./loadSave";
import { deleteIcon } from "components/icons";
import "./saves.scss";

function Card({
  className,
  content,
  index,
}: {
  index: number;
  className?: string;
  content: Content;
}) {
  const navigate = useNavigate();
  const { deleteContent } = useContext(savesContext);

  const onLoad = loadSave(content, navigate);
  return (
    <div className={`card_container ${className}`} onClick={onLoad}>
      <Paper content={content} />
      <section className="meta-data">
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteContent(index);
          }}
        >
          <img src={deleteIcon} />
        </button>
        <h4>{content.name}</h4>
        <p>{content.type}</p>
      </section>
    </div>
  );
}

function Paper({ content }: { content: Content }) {
  return (
    <section className="paper">
      <section className="inner_paper">
        {(() => {
          switch (content.type) {
            case "readTextAndAnswerQuestion":
              return (
                <>
                  <h5>Text</h5>
                  <p>{content.text}</p>
                  <h5>Question</h5>
                  <p>{content.question}</p>
                  <h5>Answer</h5>
                  <p>{content.answer}</p>
                  <h5>Regurgitated Text Below</h5>
                  <p>{content.regurgitation?.join(". ")}</p>
                </>
              );
            case "regurgitator":
              return (
                <>
                  <h5>Target Text</h5>
                  <p>{content.target}</p>
                  <h5>Regurgitated Text Below</h5>
                  <p>{content.regurgitation?.join(". ")}</p>
                </>
              );
            case "essayFramework":
              return (
                <>
                  <h5>Notes</h5>
                  <p>{content.notes}</p>
                  <h5>Essay</h5>
                  <p>{content.essay}</p>
                  <h5>Regurgitated Text Below</h5>
                  <p>{content.regurgitation?.join(". ")}</p>
                </>
              );
          }
        })()}
      </section>
    </section>
  );
}

export default Card;
