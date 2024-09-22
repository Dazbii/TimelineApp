import { useEffect, useState } from "react";
import styled from "styled-components";
import { Drawer, Button, ModalClose, Input, Stack, IconButton, Menu, Grid, Tooltip } from "@mui/joy";
import TimelineItem from "./timeline-item";

const Header = styled.header`
  position: fixed;
  top: 0;
  text-align: center;
  width: 100vw;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
`;

const Item = styled.div`
  width: 50vw;
  justify-content: center;
  display: flex;
`;

const HorizontalLine = styled.div`
  width: 100%;
  background-color: white;
  height: 2px;
`

function App() {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [date, setDate] = useState(0);
  const [items, setItems] = useState<TimelineItem[]>([]);

  const toggleDrawer =
  (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(inOpen);
  };

  const addItem = () => {
    setItems(new Array<TimelineItem>().concat(items, [{label: label, date: date}])
      .sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0
    }));
  }

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
        <IconButton onClick={toggleDrawer(true)} sx={{marginLeft: 5, height: 1}} variant="outlined"> <Menu/> </IconButton>
        <h2 style={{width: '100%'}}> Timeline </h2>
      </Header>
      <Drawer open = {open} onClose={() => setOpen(false)} hideBackdrop={true}>
          <ModalClose/>
          <Stack spacing={1.5} sx={{minWidth: 300, marginTop: 10, display: 'flex', alignItems: 'center'}}>
            <Input placeholder="Marker Title" onChange={e => setLabel(e.target.value)}></Input>
            <Input type="date" onChange={e => setDate(Date.parse(e.target.value))}></Input>
            <Button onClick={addItem}> Submit </Button>
          </Stack>
        </Drawer>
      <HorizontalLine/>
      <Container>
        {items.map(item => {
          return <Item>
            <Tooltip title={new Date(item.date).toDateString()}>
              <div style={{width: 'fit-content'}}>{item.label}</div>
            </Tooltip>
          </Item>
        })}
      </Container>
    </div>
  );
}

export default App;
