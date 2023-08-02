import "./landingPage.scss";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const propsObj = {
  title1: " HOMEWORK",
  title2: "DOOER PRO",
  subheader1: "Spend less time doing homework",
  subheader2: "and more time studying",
  illustration: "/images/hdp_illustration.png",
  background: "/images/landing_bg_dsk.png",
  background_mobile: "/images/landing_bg_mob.png",
  action_mobile: {
    action_title: "Doo",
    to: "/styleboard",
  },
  action1: {
    title: "Essay Framework",
    to: "/essayFramework",
    action_title: "Doo",
  },
  action2: {
    title: "Read text then answer question",
    to: "/readAnswer",
    action_title: "Doo",
  },
  action3: {
    title: "Regurgitator (Plagiarism Protection)",
    to: "/regurgitator",
    action_title: "Doo",
  },
};
function LandingPage(propsIn: any) {
  let props = propsIn?.title1 ? propsIn : propsObj;
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />;
}
function ActionCard({ title, to, action_title }: any) {
  return (
    <Link to={to}>
      <div className="action_card">
        <h3>{title}</h3>
        <button className="fixed_width_btn">{action_title}</button>
      </div>
    </Link>
  );
}

function Desktop(props: any) {
  return (
    <div className="landing_page_design">
      <img
        alt="background_design"
        className="background_image"
        src={props.background}
      />

      <section className="headers_and_art">
        <h1>
          {props.title1} <br />
          {props.title2}
        </h1>
        <section className="subheaders_and_art">
          <h2>
            {props.subheader1}
            <br />
            {props.subheader2}
          </h2>
          <img
            src={props.illustration}
            alt="logo illustration"
            className="illustration"
          />
        </section>
      </section>
      <section className="action_section">
        <ActionCard {...props.action1} />
        <ActionCard {...props.action2} />
        <ActionCard {...props.action3} />
      </section>
    </div>
  );
}

function Mobile(props: any) {
  return (
    <div className="landing_page_design">
      <img
        alt="background_design"
        className="background_image"
        src={props.background_mobile}
      />
      <img
        src={props.illustration}
        alt="logo illustration"
        className="illustration"
      />
      <h1>
        {props.title1} <br />
        {props.title2}
      </h1>
      <h2>
        {props.subheader1}
        <br />
        {props.subheader2}
      </h2>
      <Link to={props.action_mobile.to}>
        <button className="fixed_width_btn">
          {props.action_mobile.action_title}
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;
