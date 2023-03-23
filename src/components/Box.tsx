import { motion } from "framer-motion";
import styled from "styled-components";

const BoxWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #2d3436;
  height: 200px;
  color: #dfe6e9;
  font-size: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

export default function Box(props: any) {
  return <BoxWrapper {...props} />;
}
