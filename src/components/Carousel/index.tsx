import React, { useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { delay } from "../../util/timing";

type typeSize = {
  width: number | string;
  height: number | string;
};

type typeTransition = {
  duration: string;
  timing: string;
};

interface ICarousel<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement | null;
  vertical?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  size?: typeSize;
  transition?: typeTransition;
  onStep?: (
    index: number,
    { next, previous }: { next: unknown; previous: unknown },
  ) => void;
  swipeable: false;
}

function Carousel<T>(props: ICarousel<T>) {
  const {
    data = [],
    renderItem = (item, index) => {
      console.log(item, index);
      return null;
    },
    vertical = false,
    autoPlay = false,
    autoPlayInterval = 2000,
    size = { width: "100%", height: "100%" },
    transition = {
      duration: "300ms",
      timing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
    onStep = (index, { next, previous }) => {
      console.log(index, next, previous);
    },
    swipeable = false,
  } = props;
  const dataRefs = useRef<any>([]);
  const [fakeSetActive, setFakeSetActive] = useState(1);
  const fakeSet = useMemo(() => {
    try {
      return [data[data.length - 1], ...data, data[0]];
    } catch (e) {
      return [];
    }
  }, [data]);
  const isFakeLast = fakeSet.length - 1 === fakeSetActive;
  const isFakeFirst = fakeSetActive === 0;
  const trackWidth = `${fakeSet.length * 100}%`;

  const active = data.findIndex((img) => img === fakeSet[fakeSetActive]);

  const next = useMemo(
    () =>
      _.debounce(() => {
        setFakeSetActive((prev) => prev + 1);
      }, 200),
    [],
  );

  const previous = useMemo(
    () =>
      _.debounce(() => {
        setFakeSetActive((prev) => prev - 1);
      }, 200),
    [],
  );

  useEffect(() => {
    onStep(active, { next, previous });
  }, [active, onStep, next, previous]);

  async function seamlessGoToFirst() {
    removeTransition();
    await delay(10);
    setFakeSetActive(1);
    await delay(10);
    restoreTransition();
  }

  async function seamlessGoToLast() {
    removeTransition();
    await delay(10);
    setFakeSetActive(fakeSet.length - 2);
    await delay(10);
    restoreTransition();
  }

  function removeTransition() {
    dataRefs.current.forEach((n: any) => {
      n.classList.add("no-transition");
    });
  }

  function restoreTransition() {
    dataRefs.current.forEach((n: any) => {
      n.classList.remove("no-transition");
    });
  }

  const handleTransition = async () => {
    if (!isFakeFirst && !isFakeLast) {
      restoreTransition();
      return;
    }
    isFakeLast ? await seamlessGoToFirst() : await seamlessGoToLast();
  };

  useEffect(() => {
    let id: null | number = null;
    if (autoPlay) {
      id = setInterval(() => {
        next();
      }, autoPlayInterval);
    }
    return () => {
      clearInterval(id as number);
    };
  }, [autoPlay, autoPlayInterval, next]);

  const [enter, setEnter] = useState(0);

  function handleTouchStart(touched: any) {
    setEnter(vertical ? touched.clientY : touched.clientX);
  }
  function handleTouchEnd(touched: any) {
    const diff = enter - (vertical ? touched.clientY : touched.clientX);
    const positive = diff >= 0;
    const overHalf =
      Math.abs(diff) >
      (vertical ? touched.target.clientHeight : touched.target.clientWidth) / 4;
    if (overHalf) {
      if (positive) {
        next();
      } else {
        previous();
      }
    }
    setEnter(0);
  }

  const _props = swipeable
    ? {
        onMouseDown: handleTouchStart,
        onMouseUp: handleTouchEnd,
        onTouchStart: (e: any) => {
          const touched = e.changedTouches[0];
          handleTouchStart(touched);
        },
        onTouchEnd: (e: any) => {
          const touched = e.changedTouches[0];
          handleTouchEnd(touched);
        },
      }
    : {};

  return (
    <StyledCarousel
      draggable={false}
      {..._props}
      // onMouseDown={handleTouchStart}
      // onMouseUp={handleTouchEnd}
      // onTouchStart={(e: any) => {
      //   const touched = e.changedTouches[0];
      //   handleTouchStart(touched);
      // }}
      // onTouchEnd={(e: any) => {
      //   const touched = e.changedTouches[0];
      //   handleTouchEnd(touched);
      // }}
      vertical={vertical}
      className="carousel"
      size={size}
      transition={transition}>
      <div className="track" style={{ width: trackWidth }}>
        {fakeSet.map((item, i) => {
          const transformX = `translateX(${-fakeSetActive * 100}%)`;
          const transformY = `translateY(${-fakeSetActive * 100}%)`;
          return (
            <div
              key={i}
              ref={(node) => {
                dataRefs.current[i] = node;
              }}
              className="item transition"
              onTransitionEnd={handleTransition}
              style={{
                transform: vertical ? transformY : transformX,
              }}>
              {renderItem(item, i)}
            </div>
          );
        })}
      </div>
    </StyledCarousel>
  );
}

const StyledCarousel = styled.div<{
  vertical: boolean;
  transition: typeTransition;
  size: typeSize;
}>`
  position: relative;
  width: ${({ size }: { size: typeSize }) => {
    return typeof size.width === "number" ? `${size.width}px` : size.width;
  }};
  height: ${({ size }: { size: typeSize }) => {
    return typeof size.height === "number" ? `${size.height}px` : size.height;
  }};
  overflow: hidden;
  & > .track {
    display: flex;
    flex-direction: ${({ vertical }: { vertical: boolean }) =>
      vertical ? "column" : "vertical"};
    height: 100%;
    & > .item {
      width: ${({ size }: { size: typeSize }) => {
        return typeof size.width === "number" ? `${size.width}px` : size.width;
      }};
      height: ${({ size }: { size: typeSize }) => {
        return typeof size.height === "number"
          ? `${size.height}px`
          : size.height;
      }};
      display: flex;
      &.transition {
        transition: ${({ transition }: { transition: typeTransition }) =>
          `all ${transition.duration} ${transition.timing}`};
      }
      &.no-transition {
        transition: none;
      }
    }
  }
`;

export default Carousel;
