import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ITooltip {
  children?: React.ReactElement;
}
const Tooltip = (props: ITooltip) => {
  const { children } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(true);

  const borderWidth = 2;


  const onEnter = () => {
    setVisible(true);
  };


  const onLeave = () => {
    setVisible(false);
  };



  useEffect(() => {
    const boundingClientRect = ref.current?.getBoundingClientRect();
    console.log(boundingClientRect);
    console.log(ref.current);
  }, []);




  return (
    <StyledToolTipWrapper
      configs={{
        visible,
      }}
      style={{}}>
      <div
        className="main"
        ref={ref}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}>
        {children}
      </div>
      <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="bridge" />
      <StyledTooltip
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        configs={{
          borderWidth,
          visible,
        }}>
        prompt
      </StyledTooltip>
    </StyledToolTipWrapper>
  );
};

const StyledToolTipWrapper = styled.div<{ configs: any }>`
  position: relative;
  display: inline-block;
  & > .bridge {
    display: inline-block;
    width: 100%;
    height: 40px; // may be the diff in toop tip and main body
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 0;
    visibility: ${({ configs }) => (configs.visible ? "visible" : "hidden")};
  }
  & > .main {
    display: inline-block;
  }
`;

const StyledTooltip = styled.div<{ configs: any }>`
  position: absolute;
  display: inline-block;
  padding: 5px 15px;
  margin: 20px 0;
  line-height: 20px;
  vertical-align: center;
  left: 100%;

  top: 100%;
  font-size: 14px;

  transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  visibility: ${({ configs }) => (configs.visible ? "visible" : "hidden")};
  transform: ${({ configs }) =>
    configs.visible ? "scale(1) translateX(-100%)" : "scale(0) translateX(0)"};
  transform-origin: 0 0;
  opacity: ${({ configs }) => (configs.visible ? 1 : 0)};
  border: ${({ configs }) => `${configs.borderWidth}px solid #000`};
`;

const App = () => {
  return <div className="App"></div>;
};

export default App;

// <Tooltip>
//     <div
//         style={{
//             width: 100,
//             height: 40,
//             border: "1px solid black",
//             display: "grid",
//             placeItems: "center",
//         }}>
//         block
//     </div>
// </Tooltip>

// {/*<Carousel<string>*/}
// {/*  size={{ width: "100%", height: "100%" }}*/}
// {/*  data={[*/}
// {/*    "https://fakeimg.pl/400x400/?text=1&font=lobster",*/}
// {/*    "https://fakeimg.pl/400x400/?text=2&font=lobster",*/}
// {/*  ]}*/}
// {/*  renderItem={(item) => {*/}
// {/*    return (*/}
// {/*      <img*/}
// {/*        draggable={false}*/}
// {/*        src={item}*/}
// {/*        style={{*/}
// {/*          width: "100%",*/}
// {/*          height: "100%",*/}
// {/*          objectFit: "cover",*/}
// {/*        }}*/}
// {/*        alt="rendered"*/}
// {/*      />*/}
// {/*    );*/}
// {/*  }}*/}
// {/*  onStep={(index, { next, previous }) => {*/}
// {/*    setStep({ index, next, previous });*/}
// {/*  }}*/}
// {/*/>*/}
// {/*<button onClick={step.previous}>previous</button>*/}
// {/*<button onClick={step.next}>next</button>*/}
