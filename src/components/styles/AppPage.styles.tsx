import { Page } from "grommet";
import styled from "styled-components";

export const AppPage = styled(Page)`

  @media only screen and (max-width: 768px) {
    overflow-x:hidden; 
    /* padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
    padding-top: env(safe-area-inset-top); */
  }

`