import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  color: #fff;
  font-size: 28px;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading({ children }: { children?: React.ReactNode }) {
  return <Loader>{children || "Loading"}</Loader>;
}
