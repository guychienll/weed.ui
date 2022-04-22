import React, { useState } from "react";
import Carousel from "weed.ui/components/Carousel";

const App = () => {
  const [step, setStep] = useState<any>(null);
  return (
    <div className="App" style={{ width: 400, height: 400 }}>
      <Carousel
        size={{ width: "100%", height: "100%" }}
        data={[
          "https://fakeimg.pl/400x400/?text=1&font=lobster",
          "https://fakeimg.pl/400x400/?text=2&font=lobster",
        ]}
        renderItem={(item, index) => {
          return (
            <img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="rendered"
            />
          );
        }}
        onStep={(index, { next, previous }) => {
          setStep({ index, next, previous });
        }}
      />
      <button onClick={step.previous}>previous</button>
      <button onClick={step.next}>next</button>
    </div>
  );
};

export default App;
