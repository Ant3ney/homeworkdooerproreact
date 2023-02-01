import { useState, useContext } from "react";
import { content as contentIcon } from "components/icons";
import { Content } from "../saveContext";
import saveContext from "../saveContext";
import "./model.scss";

export interface Model {
  onExit: Function;
  content: Content;
}

const placeholderCardsContent = [
  {
    name: "Lab 01 Biological anthropolog sasdafsdafasd sdfas",
    type: "Read Text And Answer Question",
  },
  {
    name: "Lab 01 Biological anthropolog sasdafsdafasd sdfas",
    type: "Read Text And Answer Question",
  },
  {
    name: "Lab 01 Biological anthropolog sasdafsdafasd sdfas",
    type: "Read Text And Answer Question",
  },
  {
    name: "Lab 01 Biological anthropolog sasdafsdafasd sdfas",
    type: "Read Text And Answer Question",
  },
  {
    name: "Lab 01 Biological anthropolog sasdafsdafasd sdfas",
    type: "Read Text And Answer Question",
  },
  {
    name: "Lab 01 Biological anthropolog sasdafsdafasd sdfas",
    type: "Read Text And Answer Question",
  },
];

function Model({ onExit, content }: Model) {
  const [name, setName] = useState<string>();

  const { saveContent, saves } = useContext<any>(saveContext);

  return (
    <div className="saves_model_container">
      <div className="saves_model_inner_container">
        <button
          className="close"
          onClick={(e) => {
            onExit(e);
          }}
        >
          <img src="/icons/exit.svg" alt="exit button" />
        </button>
        <h1>Saves</h1>
        <label>name</label>
        <input
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          className="saves_name"
          type="text"
        />
        <label>Type</label>
        <p className="type_name">Read Text And Answer Question</p>
        <label>Update</label>
        <section className="update_section">
          {saves ? (
            saves.map((card: any, index: number) => {
              return (
                <div
                  className="card"
                  key={index}
                  id={`save_model_card_${index}`}
                  onClick={(e: any) => {
                    // Loop though all the cards and remove the active class
                    // Then add the active class to the clicked card
                    const cards = document.querySelectorAll(
                      ".update_section .card"
                    );
                    for (let i = 0; i < cards.length; i++) {
                      cards[i].classList.remove("active");
                    }
                    document
                      .querySelector(`#save_model_card_${index}`)
                      ?.classList.add("active");

                    // set input value to the clicked card name
                    setName(card.name);
                    document
                      .querySelector(".saves_name")
                      ?.setAttribute("value", card.name);
                  }}
                >
                  <img src={contentIcon} />
                  <section className="content_container">
                    <h1>{card.name}</h1>
                    <label>{card.type}</label>
                  </section>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </section>
        <button
          onClick={() => {
            saveContent({
              ...content,
              name,
            });
            onExit();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Model;
