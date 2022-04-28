import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Carousel from "./Carousel";
import { fireEvent, userEvent, within } from "@storybook/testing-library";
import { delay } from "weed.ui/util/timing";

export default {
  title: "資料呈現/輪播牆 ( Carousel )",
  component: Carousel,
  argTypes: {
    data: {
      description: "輪播牆的資料來源，將會分別帶入 renderItem 的第一參數。",
      table: {
        type: {
          summary: "T[]",
          detail: "預設值為空陣列[]",
        },
      },
    },
    renderItem: {
      description:
        "輪播牆的內容物，此特性為一項 renderProps，第一參數為 data 迭代內容，第二參數為此內容物於 data 陣列當中的排序位置。",
      table: {
        type: {
          summary: "(item: T, index: number) => React.ReactElement | null",
          detail: "回傳值為 React.ReactElements | null",
        },
      },
    },
    size: {
      description: "輪播牆的容器大小",
      table: {
        type: {
          summary:
            "{\n  width: number | string;\n  height: number | string;\n}",
          detail: `width:  寬，預設值 100% \nheight: 高，預設值 100%`,
        },
      },
    },
    vertical: {
      description: "是否轉換為垂直輪播牆",
      table: {
        type: {
          summary: "boolean",
          detail: "預設值為 false",
        },
        defaultValue: { summary: ["false"] },
      },
    },
    autoPlay: {
      description: "是否自動播放",
      table: {
        type: {
          summary: "boolean",
          detail: "預設值為 false",
        },
        defaultValue: { summary: ["false"] },
      },
    },
    autoPlayInterval: {
      description: "播放間隔時間",
      table: {
        type: {
          summary: "number",
          detail: "單位為毫秒（ms)，預設值為 2000",
        },
        defaultValue: { summary: ["2000"] },
      },
    },
    swipeable: {
      description: "是否可以滑動",
      table: {
        type: {
          summary: "boolean",
          detail: "預設值為 true",
        },
        defaultValue: { summary: ["false"] },
      },
    },
    transition: {
      description: "播放過場效果",
      table: {
        type: {
          summary: "{\n  duration: string;\n  timing: string;\n}",
          detail: `duration: 過場時間，預設值 300 毫秒 (ms)\ntiming:   過場時間函數，預設值 cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        },
      },
    },
    onStep: {
      description:
        "為一項回調函式，用於製作分頁器 ( Paginator ) 等其他用途使用。",
      table: {
        type: {
          summary: "(index :number, { next: Func, previous: Func }) => void",
          detail: `index:     當前的位置。\nnext:      切換至下一位置之回調函式。\nprevious:  切換至上一位置之回調函式。`,
        },
      },
    },
  },
  parameters: {},
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof Carousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  data: [
    "https://fakeimg.pl/1000x1000/?text=1&font=lobster",
    "https://fakeimg.pl/1000x1000/?text=2&font=lobster",
    "https://fakeimg.pl/1000x1000/?text=3&font=lobster",
  ],
  renderItem: (item: any) => {
    return (
      <div>
        <img
          style={{ width: "100%", height: "100%" }}
          draggable={false}
          src={item as string}
          alt=""
        />
      </div>
    );
  },
  size: { width: "300px", height: "300px" },
  autoPlay: false,
  autoPlayInterval: 2000,
  vertical: false,
  swipeable: true,
  transition: {
    duration: "300ms",
    timing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  onStep: (index: number, { next, previous }: any) => {},
};

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await delay(1000);
  fireEvent.mouseDown(canvas.getByTestId("carousel"), {
    clientX: 300,
  });
  await delay(500);
  fireEvent.mouseUp(canvas.getByTestId("carousel"), {
    clientX: 0,
  });
  await delay(500);
  fireEvent.mouseDown(canvas.getByTestId("carousel"), {
    clientX: 0,
  });
  await delay(500);
  fireEvent.mouseUp(canvas.getByTestId("carousel"), {
    clientX: 300,
  });
};
