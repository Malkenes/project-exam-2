import { Meta } from "../../../shared/types";
import { StyledMetaList } from "./styles";
import { FaPaw, FaWifi, FaParking, FaCoffee } from "react-icons/fa";

export const MetaTag: React.FC<{ tags: Meta | undefined }> = ({ tags }) => {
  if (!tags) {
    return;
  }
  return (
    <StyledMetaList>
      {tags.pets && (
        <li>
          <FaPaw />
          Pets
        </li>
      )}
      {tags.wifi && (
        <li>
          <FaWifi />
          Internet
        </li>
      )}
      {tags.breakfast && (
        <li>
          <FaCoffee />
          Breakfast
        </li>
      )}
      {tags.parking && (
        <li>
          <FaParking />
          Parking
        </li>
      )}
    </StyledMetaList>
  );
};
