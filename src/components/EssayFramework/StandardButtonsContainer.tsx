import { SaveButton } from "components/Saves";
import ClearButton from "components/ClearButton";
import { useContext } from "react";
import essayFrameworkContext from "./EssayFrameworkContext";

function StandardButtonsContainer({ children, ...rest }: any) {
  const { onClickResetContent, showModel }: any = useContext(
    essayFrameworkContext
  );
  return (
    <div className="standard_buttons_container" {...rest}>
      {children}
      <SaveButton onClick={showModel} />
      <ClearButton onClick={onClickResetContent} />
    </div>
  );
}

export default StandardButtonsContainer;
