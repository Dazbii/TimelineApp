import { useEffect } from "react";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  text-align: center;
  width: 100vw;
`

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
`;

const Item = styled.div`
  width: 50vw;
  text-align: center;
`;

const HorizontalLine = styled.div`
  width: 100%;
  background-color: white;
  height: 2px;
`

const items = ['2020', '2021', '2022', '2023', '2024'];

function App() {

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (event instanceof WheelEvent) {
        const scrollAmount = event.deltaY * 4;
        window.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    }
  }, [])

  return (
    <div>
      <Header>
        <h1> Timeline </h1>
      </Header>
      <HorizontalLine/>
      <Container>
        {items.map(item => {
          return <Item>{item}</Item>
        })}
      </Container>
    </div>
  );
}

export default App;
