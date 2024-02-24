import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "./constant";

// Images 
import DiceSVG from "./images/icon-dice.svg";
import PatternDividerDesktop from "./images/pattern-divider-desktop.svg";
import PatternDividerMobile from "./images/pattern-divider-mobile.svg";

function App() {
  const [advice, setAdvice] = useState({});

  useEffect(() => {
    fetchAdvice();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  const fetchAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => setAdvice(data.slip))
      .catch((error) => console.error("Error fetching advice:", error));
  };

  const renderPatternDivider = () => {
    if (window.innerWidth <= 425) {
      return <CardDeco src={PatternDividerMobile} />;
    } else {
      return <CardDeco src={PatternDividerDesktop} />;
    }
  };

  return (
    <Main>
      <AdviceCard>
        <AdviceNum>ADVICE #{advice.id}</AdviceNum>
        <AdviceText>{advice.advice}</AdviceText>
        {renderPatternDivider()}
        <Button onClick={fetchAdvice}>
          <ButtonIcon src={DiceSVG} alt="Dice Icon" />
        </Button>
      </AdviceCard>

      <Footer>
        <p>
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge"> Frontend Mentor
          </a>
          . Coded by <a href="/">Jyoti Ogennavar</a>.
        </p>
      </Footer>
    </Main>
  );
}

const Main = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 800;
  background-color: ${COLORS.darkBlue};
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdviceCard = styled.div`
  width: 28rem;
  position: relative;
  margin-inline: 1rem;

  background-color: ${COLORS.darkGrayishBlue};
  border-radius: 1rem;
  text-align: center;
  padding: 2rem;
  margin-bottom: 2rem;

  > * {
    margin-block: 0;
  }

  > * + * {
    margin-block-start: var(--space, 1rem);
  }
`;

const AdviceNum = styled.p`
  color: ${COLORS.neonGreen};
  font-size: 0.8rem;
`;

const AdviceText = styled.p`
  color: ${COLORS.lightCyan};
  font-size: 1.5rem;
`;

const CardDeco = styled.img`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  border: none;
  background-color: ${COLORS.neonGreen};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 1rem;
  cursor: pointer;

  position: absolute; /* Position the button absolutely */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center horizontally */

  &:active {
    box-shadow: 0 0 40px rgba(85, 255, 170, 1); /* Fallback for older browsers */
    box-shadow: 0 0 40px rgba(var(${COLORS.neonGreen}-rgb), 1); /* Use the variable for color */
  }
`;
const ButtonIcon = styled.img`
  width: 20px;
  margin-inline: auto;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: .8rem;
  text-align: center;
  color: ${COLORS.lightCyan};
  width: 100%;
`;

export default App;
