import styled from "styled-components";

export const VideoPlayerContainer = styled.div<{ opacity: number }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: 100vh;
  //https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
  /* height: -webkit-fill-available; */
  background-color: black;

  .videoPlayer-preparation {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    font-size: 4rem;
  }

  video {
    width: 100%;
    height: 100vh;
    max-height: 100%;
    object-fit: cover;
  }

  mux-video {
    --controls: none;
    width: 100%;
    height: 100vh;
    max-height: 100%;
    object-fit: cover;
  }

  mux-player {
    --controls: none;
    width: 100%;
    height: 100vh;
    max-height: 100%;
    object-fit: cover;
  }

  /* video::-webkit-media-controls-start-playback-button {
    display: none !important;
  } */

  .videoPlayer-content {
    object-fit: cover;
    z-index: 20;
    background: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    /* color: white; */

    .videoPlayer-bottom {
      .videoPlayer-volume {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .videoPlayer-volume-slide {
          height: 7em;
          margin-bottom: 1em;
          margin-right: 1em;
        }

        .videoPlayer-mute-icon {
          opacity: ${({ opacity }) => opacity};
          background-color: #525252;
          border-radius: 50px;
          width: 3.5em;
          cursor: pointer;
          margin-right: 1em;
          margin-bottom: 1.5em;
          padding: 0.2em 0.2em 0em;

          svg {
            font-size: 4rem;
            margin: 0 auto;
          }
        }
      }
    }
  }
`;
