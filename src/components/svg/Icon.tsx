import Backward from './backward.svg';
import DownArrow from './downarrow.svg';
import LeftArrow from './leftarrow.svg';
import RightArrow from './rightarrow.svg';
import UpArrow from './uparrow.svg';
import Login from './login.svg';
import Key from './key.svg';
import User from './user.svg';
import Home from './home.svg';
import Logo from './logo.svg'
import Logo2 from './logo2.svg'
import Logo3 from './logo3.svg'
import Menu from './menusvg.svg'
import Close from './close.svg'
import Plus from './plus.svg'

type Props = {
    svg: string;
    width: string;
    height: string;
    fillColor?: string;
    strokeColor?: string;
};

export const Icon = ({svg, width, height, fillColor, strokeColor} : Props) => {

  return (
    <div className='pr-3'>
        {svg === "backward" && <Backward height={height} width={width} />}
        {svg === "downarrow" && <DownArrow height={height} width={width} />}
        {svg === "leftarrow" && <LeftArrow height={height} width={width} />}
        {svg === "rightarrow" && <RightArrow height={height} width={width} />}
        {svg === "uparrow" && <UpArrow height={height} width={width} />}
        {svg === "login" && <Login height={height} width={width} />}
        {svg === "key" && <Key height={height} width={width} />}
        {svg === "user" && <User height={height} width={width} />}
        {svg === "home" && <Home height={height} width={width} />}
        {svg === "logo" && <Logo height={height} width={width} />}
        {svg === "logo2" && <Logo2 height={height} width={width} />}
        {svg === "logo3" && <Logo3 height={height} width={width} />}
        {svg === "menu" && <Menu height={height} width={width} />}
        {svg === "close" && <Close height={height} width={width} />}
        {svg === "plus" && <Plus height={height} width={width} />}
    </div>
  )
}