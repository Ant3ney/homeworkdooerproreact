import { useEffect, useContext } from "react";
import navContext from "./navContext";
import { Link } from "react-router-dom";
import "./nav.scss";
export default function Nav() {
  const { extend, setExtend } = useContext<any>(navContext);
  useEffect(() => {
    if (extend) document.querySelector("nav")?.classList.add(`extended`);
    else document.querySelector("nav")?.classList.remove(`extended`);
  }, [extend]);

  return (
    <>
      <button
        style={{
          backgroundColor: !extend ? "#f2f2f2" : "#636c79",
        }}
        className="nav_overlay"
        onClick={() => setExtend(!extend)}
      >
        <img
          src={!extend ? "/icons/expand_nav.svg" : "/icons/shrink_nav.svg"}
        />
      </button>
      <nav>
        <div className="inner_nav_container">
          <Link to="/">
            <img src="/hdp_icon_large.png" alt="Homework Dooer Pro" />
            <h1>Homework Dooer Pro</h1>
          </Link>
          <ul>
            <Link to="/saves">
              <li>Saves</li>
            </Link>
          </ul>
          <hr />
          <ul>
            <Link to="/readAnswer">
              <li>Read text then answer question</li>
            </Link>
            <Link to="/regurgitator">
              <li>Regurgitator (Plagiarism Protection)</li>
            </Link>
            <Link to="/essayFramework">
              <li>Essay Framework</li>
            </Link>
          </ul>
        </div>
        {/* <div>arrow</div> */}
      </nav>
    </>
  );
}
