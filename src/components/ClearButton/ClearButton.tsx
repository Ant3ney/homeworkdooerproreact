import "./clearButton.scss";
import { whiteClear } from "components/icons";

function ClearButton({
  children,
  className,
  title = "Clear Content",
  preventIcon = false,
  ...rest
}: any) {
  return (
    <button className={`clear_button ${className}`} {...rest}>
      {children}
      <p>{title}</p>
      {!preventIcon ? <img src={whiteClear} /> : <></>}
    </button>
  );
}

export default ClearButton;
