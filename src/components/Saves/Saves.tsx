import Card from "./Card";
import "./saves.scss";
import { useMediaQuery } from "react-responsive";
import createSavesClasses from "./createSavesClasses";
import savesContext, { Content } from "./saveContext";
import { useContext } from "react";

function Saves({}: any) {
  const { saves } = useContext(savesContext);

  const md = useMediaQuery({ query: "(max-width: 	1090px)" });
  const lg = useMediaQuery({ query: "(max-width: 	1375px)" });
  const xl2 = useMediaQuery({ query: "(max-width: 1800px)" });
  return (
    <div className="saves_container">
      <h4>Saves</h4>
      <p>
        The work you save will show up here so that you can return to where you
        left off!
      </p>
      <section className="card_container_container">
        {saves && saves.length ? (
          saves.map((content: Content, i: number) => {
            const className = createSavesClasses(md, lg, xl2, i);
            return (
              <Card key={i} index={i} className={className} content={content} />
            );
          })
        ) : (
          <p className="no_saves">No Saves Made</p>
        )}
      </section>
    </div>
  );
}

export default Saves;
