import { AnimatePresence, motion } from "framer-motion";

import { makeImagePath } from "../utils";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalWrapper = styled(motion.div)`
  width: 500px;
  height: 500px;
  position: absolute;
  background: gray;
  left: 50%;
  margin-left: -250px;
`;

const Poster = styled.div`
  position: absolute;
  top: -30px;
  left: 20px;
  width: 150px;
  height: 200px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

interface IClickedContent {
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  vote_average: number;
}

export default function Modal({
  scrollY,
  layoutId,
  clickedContent,
}: {
  scrollY: number;
  layoutId: string;
  clickedContent?: IClickedContent | "";
}) {
  const navigate = useNavigate();
  const onClickOverlay = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      <Overlay onClick={onClickOverlay} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      {clickedContent && (
        <ModalWrapper
          style={{
            top: scrollY + 100,
          }}
          layoutId={layoutId}
        >
          <div style={{ overflow: "hidden", height: 250 }}>
            <img
              src={makeImagePath(clickedContent.backdrop_path)}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Poster>
              <img src={makeImagePath(clickedContent.poster_path)} alt="" />
            </Poster>
            <div style={{ paddingLeft: 200, paddingTop: 20 }}>
              <p style={{ fontSize: 26 }}>{clickedContent.title || clickedContent.name}</p>
              <p style={{ overflow: "hidden", marginTop: 10, maxHeight: 94 }}>
                {clickedContent.overview}
              </p>
              <p style={{ marginTop: 10 }}>평점: {clickedContent.vote_average}</p>
            </div>
          </div>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
}
