import { SaveButton } from "components/Saves";
import ClearButton from "components/ClearButton";

function StandardButtonsContainer({ children, ...rest }: any) {
  return (
    <div className="standard_buttons_container" {...rest}>
      {children}
      <SaveButton />
      <ClearButton />
    </div>
  );
}

export default StandardButtonsContainer;
