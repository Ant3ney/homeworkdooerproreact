import "./saves.scss";
import { saveAs as saveAsIcon } from "components/icons";

function SaveButton({
  children,
  className,
  title = "Save Content",
  preventIcon = false,
  ...rest
}: any) {
  return (
    <button className={`save_button ${className}`} {...rest}>
      {children}
      <p>{title}</p>
      {!preventIcon ? <img src={saveAsIcon} /> : <></>}
    </button>
  );
}

export default SaveButton;
