import {
  StyledProgressContainer,
  StyledProgressBar,
} from "../../../components/form/styles";
import { StyledFormWrapper } from "../styles";
import { useMultiStepStore } from "../../../stores/useMultiStepStore";
import { Personal } from "./personal";
import { VenueManager } from "./venueManager";
import { Avatar } from "./avatar";
import { Banner } from "./banner";

export const MultiSteps: React.FC = () => {
  const step = useMultiStepStore((state) => state.step);
  const totalSteps: number = 4;
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <Personal />;
      case 2:
        return <Avatar />;
      case 3:
        return <Banner />;
      case 4:
        return <VenueManager />;
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
