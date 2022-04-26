import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CircularProgress from "./CircularProgress";

export default {
  title: "資料呈現/環狀進度條 ( CircularProgress )",
  component: CircularProgress,
  argTypes: {
    percentage: {
      description: "",
      table: {
        defaultValue: {
          summary: ["30"],
        },
      },
    },
    progressingColor: {
      description: "",
      table: {
        defaultValue: {
          summary: ["#444"],
        },
      },
    },
    doublePercentage: {
      description: "",
      table: {
        defaultValue: {
          summary: ["10"],
        },
      },
    },
    doubleColor: {
      description: "",
      table: {
        defaultValue: {
          summary: ["#f44"],
        },
      },
    },
    double: {
      description: "",
      table: {
        defaultValue: {
          summary: ["true"],
        },
      },
    },
    progressWidth: {
      description: "",
      table: {
        defaultValue: {
          summary: ["40"],
        },
      },
    },
    size: {
      description: "",
      table: {
        defaultValue: {
          summary: ["true"],
        },
      },
    },
    defaultColor: {
      description: "",
      table: {
        defaultValue: {
          summary: ["#ccc"],
        },
      },
    },
    containerBackgroundColor: {
      description: "",
      table: {
        defaultValue: {
          summary: ["#eee"],
        },
      },
    },
    children: {
      description: "",
      table: {
        defaultValue: {
          summary: [
            "    <div\n" +
              "      style={{\n" +
              '        width: "100%",\n' +
              '        height: "100%",\n' +
              '        display: "grid",\n' +
              '        placeItems: "center",\n' +
              "      }}>\n" +
              "      <h1>Weed</h1>\n" +
              "    </div>\n",
          ],
        },
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
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = (args) => (
  <CircularProgress {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  percentage: 30,
  progressingColor: "#444",
  doublePercentage: 10,
  doubleColor: "#f44",
  double: true,
  size: 200,
  progressWidth: 40,
  defaultColor: "#ccc",
  children: (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}>
      <h1>Weed</h1>
    </div>
  ),
  containerBackgroundColor: "#eee",
};
