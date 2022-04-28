import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

interface IPaginator {
  pages: number;
  active: number;
  goToNext: () => void;
  goToPrevious: () => void;
}

const Paginator = (props: IPaginator) => {
  const { pages = 10, active = 1, goToNext, goToPrevious } = props;

  return (
    <StyledPaginator>
      <button className="previous" onClick={goToPrevious}>
        {"<"}
      </button>
      <div className="page-items">
        {new Array(pages).fill({}).map((_page, index) => {
          const page = index + 1;
          const _active = page === active;
          return (
            <button
              className={classNames({
                "page-item": true,
                active: _active,
              })}
              key={page}>
              {page}
            </button>
          );
        })}
      </div>
      <button className="next" onClick={goToNext}>
        {">"}
      </button>
    </StyledPaginator>
  );
};

const StyledPaginator = styled.div`
  & button {
    all: unset;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  & > .previous,
  .next {
    width: 25px;
    height: 25px;
    margin: 0 10px;
    border-radius: 50%;
    border: 1px solid #444;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > .page-items {
    display: flex;
    & > .page-item {
      width: 25px;
      height: 25px;
      border: 1px solid #444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 5px;
      &.active {
        background-color: #7a8f47;
        color: #fff;
      }
      &:hover {
        background-color: #7a8f47;
        color: #fff;
      }
    }
  }
`;

const App = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="App" style={{ padding: 300 }}>
      <Paginator
        pages={10}
        active={active}
        goToNext={() => {
          if (active >= 10) {
            return;
          }
          setActive((prev) => prev + 1);
        }}
        goToPrevious={() => {
          if (active <= 1) {
            return;
          }
          setActive((prev) => prev - 1);
        }}
      />
    </div>
  );
};

export default App;
