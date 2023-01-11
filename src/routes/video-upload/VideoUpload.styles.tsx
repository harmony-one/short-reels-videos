import styled from "styled-components";

export const VideoUploadDiv = styled.div<{ opacity: number }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-content: space-between;

  .swipe-action-icon {
    opacity: ${({ opacity }) => opacity};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: #525252;

    .swipe-action-icon-top {
      font-size: 4rem;
    }
    .swipe-action-icon-bottom {
      font-size: 2rem;
      top: 1em;
      position: absolute;
    }

    polygon {
      fill: white;
    }
  }

  .upload-icon {
    text-align: center;
    font-size: 10rem;
    color: #1f5ae2;
  }
`;
