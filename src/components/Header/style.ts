import { motion } from "framer-motion";
import styled from 'styled-components';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 300;
  box-sizing: border-box;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;

  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  a {
    color: ${(props) => props.theme.white.darker};
  }
  &:hover {
    a {
      color: ${(props) => props.theme.white.lighter};
    }
  }
`;

const Search = styled.div`
  position: relative;
  color: white;
  svg {
    height: 25px;
    width: 25px;
  }
  display: flex;
  align-items: center;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;

  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -150px;
  top: 0;
  background: none;
  border: 1px solid #fff;
  transform: scaleX(0);
  height: 25px;
  color: #fff;
  padding: 0 10px;
  min-width: 164px;
`;

export {
  Nav,
  Col,
  Logo,
  Items,
  Item,
  Search,
  Circle,
  Input
}
