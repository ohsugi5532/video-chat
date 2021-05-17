import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  button {
    margin-left: 60px;
  }
`;

export const StyledLayout = styled.main`
  display: block;
  min-height: 100%;
  margin: auto;

  @media (min-width: 600px) and (min-height: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
`;
