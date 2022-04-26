import React, { useMemo } from "react";

interface ICircularProgress {
  percentage?: number;
  progressingColor?: string;
  doublePercentage?: number;
  doubleColor?: string;
  double?: boolean;
  defaultColor?: string;
  size?: number;
  progressWidth?: number;
  style?: any;
  children?: React.ReactElement;
  containerBackgroundColor?: string;
}

const CircleProgress = (props: ICircularProgress) => {
  const {
    percentage = 90,
    progressingColor = "rgba(204,167,92,1)",
    doublePercentage = 60,
    doubleColor = "red",
    double = true,
    defaultColor = "#ddd",
    size = 150,
    progressWidth = 40,
    style = {},
    children,
    containerBackgroundColor = "#fff",
  } = props;

  const deg = (360 * (percentage >= 100 ? 100 : percentage)) / 100;
  const doubleDeg =
    (360 * (doublePercentage >= 100 ? 100 : doublePercentage)) / 100;

  const isOverHalf = useMemo(() => {
    return Math.abs((deg / 360) * 100) > 50;
  }, [deg]);

  const isDoubleOverHalf = useMemo(() => {
    return Math.abs((doubleDeg / 360) * 100) > 50;
  }, [doubleDeg]);

  const getClipPath = () => {
    if (doubleDeg <= 90) {
      return `polygon(50% 0, ${
        ((size / 2) * Math.tan((doubleDeg * Math.PI) / 180)) / (size / 100) + 50
      }% 0, 50% 50%)`;
    } else if (doubleDeg <= 180) {
      return `polygon(50% 0,100% 0,100% ${
        ((size / 2) * Math.tan(((doubleDeg - 90) * Math.PI) / 180)) /
          (size / 100) +
        50
      }%, 50% 50%)`;
    } else if (doubleDeg <= 270) {
      return `polygon(50% 0,100% 0,100% 100%,${
        50 -
        ((size / 2) * Math.tan(((doubleDeg - 180) * Math.PI) / 180)) /
          (size / 100)
      }% 100% ,50% 50%)`;
    } else if (doubleDeg < 360) {
      return `polygon(50% 0,100% 0,100% 100%,0 100%,
        0 ${
          50 -
          ((size / 2) * Math.tan(((doubleDeg - 270) * Math.PI) / 180)) /
            (size / 100)
        }%  
        ,50% 50%)`;
    } else {
      return `polygon(0 0,100% 0,100% 100%,0 100%)`;
    }
  };

  return (
    <div style={style}>
      <div style={{ position: "relative", width: size, height: size }}>
        <div style={{ position: "absolute", zIndex: 1 }}>
          <div
            style={{
              position: "relative",
              width: size,
              height: size,
              borderRadius: size / 2,
              overflow: "hidden",
              backgroundColor: progressingColor,
            }}>
            <div
              style={{
                position: "absolute",
                width: size / 2,
                height: size,
                backgroundColor: defaultColor,
                zIndex: 4,
                top: 0,
                left: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: size / 2,
                height: size,
                backgroundColor: isOverHalf ? progressingColor : defaultColor,
                transformOrigin: isOverHalf ? "right" : "left",
                transform: `rotate(${deg}deg)`,
                zIndex: 5,
                top: 0,
                ...(isOverHalf ? { left: 0 } : { right: 0 }),
              }}
            />
          </div>
        </div>
        {double && (
          <div style={{ position: "absolute", zIndex: 2 }}>
            <div
              style={{
                position: "relative",
                width: size,
                height: size,
                borderRadius: size / 2,
                overflow: "hidden",
                backgroundColor: doubleColor,
                clipPath: getClipPath(),
              }}>
              <div
                style={{
                  position: "absolute",
                  width: size / 2,
                  height: size,
                  backgroundColor: defaultColor,
                  zIndex: 4,
                  top: 0,
                  left: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: size / 2,
                  height: size,
                  backgroundColor: isDoubleOverHalf
                    ? doubleColor
                    : defaultColor,
                  transformOrigin: isDoubleOverHalf ? "right" : "left",
                  transform: `rotate(${doubleDeg}deg)`,
                  zIndex: 5,
                  top: 0,
                  ...(isDoubleOverHalf ? { left: 0 } : { right: 0 }),
                }}
              />
            </div>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            width: size - progressWidth,
            height: size - progressWidth,
            borderRadius: (size - progressWidth) / 2,
            backgroundColor: containerBackgroundColor,
            top: "50%",
            left: "50%",
            transform: `translateX(${
              ((size - progressWidth) / 2) * -1
            }px) translateY(${((size - progressWidth) / 2) * -1}px)`,
            zIndex: 100,
          }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CircleProgress;
