import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ErrorMsgCard.scss";

const ErrorMsgCard = ({ msgText, onBtnXClickError }) => {
  const handleBtnXClickError = () => {
    if (onBtnXClickError) {
      onBtnXClickError();
    }
  };

  return (
    <div className="error-msg-card">
      <h4 className="error-msg-card__error-text">{msgText}</h4>
      <FontAwesomeIcon
        onClick={handleBtnXClickError}
        className="error-msg-card__x-close"
        icon={faTimes}
      />
    </div>
  );
};

export default ErrorMsgCard;
