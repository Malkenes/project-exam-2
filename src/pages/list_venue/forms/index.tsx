import {
  StyledProgressContainer,
  StyledProgressBar,
} from "../../../components/form/styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { StyledFormWrapper } from "../../signin/styles";
import { Location } from "./location";
import { Information } from "./information";
import { Media } from "./media";
import { Pricing } from "./pricing";
import { Amenities } from "./amenities";
import { Confirmation } from "./confirmation";

export const MultiSteps: React.FC = () => {
  const step = useMultiStepStore((state) => state.step);
  const totalSteps: number = 6;
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <Location />;
      case 2:
        return <Information />;
      case 3:
        return <Media />;
      case 4:
        return <Pricing />;
      case 5:
        return <Amenities />;
      case 6:
        return <Confirmation />;
      default:
        break;
    }
  };
  return (
    <StyledFormWrapper>
      <StyledProgressContainer>
        <StyledProgressBar $percent={step / totalSteps} />
      </StyledProgressContainer>
      {renderSteps()}
    </StyledFormWrapper>
  );
};
