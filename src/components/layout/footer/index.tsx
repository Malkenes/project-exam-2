import * as S from "./styles";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

/**
 * Footer component for the Holidaze application.
 *
 * This component renders the footer section of the Holidaze website,
 * including quick links, social media icons, and copyright information.
 *
 * @component
 * @returns {JSX.Element} The rendered footer component.
 *
 */

export const Footer: React.FC = () => {
  return (
    <S.StyledFooter>
      <S.StyledQuickLinks>
        <ul>
          <li>
            <a href="#">About Holidaze</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Download the Holidaze App</a>
          </li>
        </ul>
      </S.StyledQuickLinks>
      <S.StyledSocials>
        <ul>
          <li>
            <a href="#">
              <FaFacebook size={24} title="facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram size={24} title="instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTiktok size={24} title="tiktok" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaYoutube size={24} title="youtube" />
            </a>
          </li>
        </ul>
      </S.StyledSocials>
      <div>
        <div>
          <img src="/img/logo_holidaze.png" alt="Logo" />
        </div>
        <p>© 2024 Holidaze, All rights reserved.</p>
      </div>
    </S.StyledFooter>
  );
};
