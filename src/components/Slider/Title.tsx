import styled from "styled-components";

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 26px;
  font-weight: 500;
  padding: 0 20px;
`;

export default function SliderTitle({ title }: { title: string }) {
  return <Title>{title}</Title>;
}
