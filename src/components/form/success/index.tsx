import { Link } from "react-router-dom";
import { StyledSuccessMessage } from "./styles";

interface Props {
  title: string;
  message: string;
  link: string;
}

export const SuccessMessage: React.FC<Props> = ({ title, message, link }) => {
  return (
    <StyledSuccessMessage>
      <h2>{title}</h2>
      <Link to={link}>{message}</Link>
    </StyledSuccessMessage>
  );
};
