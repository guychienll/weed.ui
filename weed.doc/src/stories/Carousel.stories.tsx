import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Carousel from "./Carousel";

export default {
  title: "資料呈現/輪播牆 ( Carousel )",
  component: Carousel,
  argTypes: {
    data: {
      description: "",
      table: {
        defaultValue: { summary: ["[]"] },
      },
    },
    size: {
      description: "",
      table: {
        defaultValue: { summary: ["{ width: '100%' , height: '100%'}"] },
      },
    },
    renderItem: {
      description: "",
      table: {
        defaultValue: {
          summary: [
            "(item, index) => {\n      console.log(item, index);\n      return null;\n    }",
          ],
        },
      },
    },
    vertical: {
      description: "",
      table: {
        defaultValue: { summary: ["false"] },
      },
    },
    autoPlay: {
      description: "",
      table: {
        defaultValue: { summary: ["false"] },
      },
    },
    autoPlayInterval: {
      description: "",
      table: {
        defaultValue: { summary: ["2000"] },
      },
    },
    transition: {
      description: "",
      table: {
        defaultValue: {
          summary: [
            '{\n      duration: "300ms",\n      timing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",\n    }',
          ],
        },
      },
    },
    onStep: {
      description: "",
      table: {
        defaultValue: {
          summary: [
            "(index, { next, previous }) => {\n      console.log(index, next, previous);\n    }",
          ],
        },
      },
    },
    swipeable: {
      description: "",
      table: {
        defaultValue: { summary: ["false"] },
      },
    },
  },
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
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
  size: { width: "300px", height: "300px" },
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
  vertical: false,
  autoPlay: false,
  autoPlayInterval: 2000,
  transition: {
    duration: "300ms",
    timing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  onStep: (index: number, { next, previous }: any) => {},
  swipeable: false,
};
