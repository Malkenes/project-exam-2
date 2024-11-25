import { Venue } from "../../shared/types";
import {
  StyledImageContainer,
  StyledProductCard,
  StyledProductInfo,
  StyledProductLocation,
  StyledProductPrice,
} from "./styles";
import { getlocationDetails } from "../../utils/helpers";
import { MetaTag } from "./metaTag";

export const ProductCard: React.FC<Partial<Venue>> = ({
  name,
  price,
  media,
  location,
  meta,
  rating,
}) => {
  return (
    <StyledProductCard>
      <StyledImageContainer>
        {media && media[0] && <img src={media[0].url} alt={media[0].alt} />}
      </StyledImageContainer>
      <StyledProductInfo>
        <StyledProductLocation>
          <p>{getlocationDetails(location)}</p>
          <div>{rating}</div>
        </StyledProductLocation>
        <h3>{name}</h3>
        <MetaTag tags={meta} />
        <div>
          <StyledProductPrice>{price} Bitcoin</StyledProductPrice>
          <p>Per Night</p>
        </div>
      </StyledProductInfo>
    </StyledProductCard>
  );
};
