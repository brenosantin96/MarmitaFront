import BackwardIcon from '../Icons/BackwardIcon';
import SearchIcon from '../Icons/SearchIcon';
import MenuIcon from '../Icons/MenuIcon';
import UserIcon from '../Icons/UserIcon';
import CartIcon from '../Icons/CartIcon';
import LogoIcon from '../Icons/LogoIcon';
import LogoIcon2 from '../Icons/LogoIcon2';
import CloseIcon from '../Icons/CloseIcon';
import CloseIcon2 from '../Icons/CloseIcon2';
import RightArrowIcon from '../Icons/RightArrowIcon';
import LeftArrowIcon from '../Icons/LeftArrowIcon';
import LocationIcon from '../Icons/LocationIcon';
import LocationIcon2 from '../Icons/LocationIcon2';
import LittleXIcon from '../Icons/LittleXIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import GoogleIcon from '../Icons/GoogleIcon';
import NewCartIcon2 from '../Icons/NewCartIcon2';
import EyeClosedIcon from '../Icons/EyeClosedIcon';
import NewEyeOpenedIcon from '../Icons/NewEyeOpenedIcon';


type Props = {
  svg: string;
  width: string;
  height: string;
  fillColor?: string;
  strokeColor?: string;
};

export const Icon = ({ svg, width, height, fillColor, strokeColor }: Props) => {

  return (
    <div>
      {svg === "backward" && <BackwardIcon height={height} width={width} />}
      {svg === "search" && <SearchIcon height={height} width={width} />}
      {svg === "menu" && <MenuIcon height={height} width={width} />}
      {svg === "user" && <UserIcon height={height} width={width} />}
      {svg === "cart" && <CartIcon height={height} width={width} />}
      {svg === "cart2" && <NewCartIcon2 height={height} width={width} color={fillColor} strokeColor={strokeColor} />}
      {svg === "logo" && <LogoIcon height={height} width={width} />}
      {svg === "logo2" && <LogoIcon2 height={height} width={width} color={fillColor} strokeColor={strokeColor} />}
      {svg === "close" && <CloseIcon height={height} width={width} />}
      {svg === "close2" && <CloseIcon2 height={height} width={width} />}
      {svg === "rightarrow" && <RightArrowIcon height={height} width={width} />}
      {svg === "leftarrow" && <LeftArrowIcon height={height} width={width} />}
      {svg === "location" && <LocationIcon height={height} width={width} />}
      {svg === "location2" && <LocationIcon2 height={height} width={width} />}
      {svg === "littlex" && <LittleXIcon height={height} width={width} />}
      {svg === "facebook" && <FacebookIcon height={height} width={width} color={fillColor} strokeColor={strokeColor} />}
      {svg === "google" && <GoogleIcon height={height} width={width} />}
      {svg === "eyeclosed" && <EyeClosedIcon height={height} width={width} color={fillColor} strokeColor={strokeColor} />}
      {svg === "eyeopened" && <NewEyeOpenedIcon height={height} width={width} color={fillColor} strokeColor={strokeColor}  />}
    </div>
  )
}