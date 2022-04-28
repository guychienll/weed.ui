import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CircularProgress from "./CircularProgress";
import {
  ArgsTable,
  Description,
  Preview,
  PRIMARY_STORY,
  Stories,
  Story,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import styled from "styled-components";

export default {
  title: "資料呈現/環狀進度條 ( CircularProgress )",
  component: CircularProgress,
  argTypes: {
    percentage: {
      description: "主要進度條佔比",
      table: {
        type: {
          summary: "number",
          detail: "預設值為 30",
        },
      },
    },
    progressingColor: {
      description: "主要進度條顏色",
      table: {
        type: {
          summary: "string",
          detail: "預設值為 orange",
        },
      },
    },
    doublePercentage: {
      description: "次要進度條佔比",
      table: {
        type: {
          summary: "string",
          detail: "預設值為 10",
        },
      },
    },
    doubleColor: {
      description: "次要進度條顏色",
      table: {
        type: {
          summary: "string",
          detail: "預設值為 darkolivegreen",
        },
      },
    },
    double: {
      description: "是否開啟次要進度條",
      table: {
        type: {
          summary: "boolean",
          detail: "預設值為 true",
        },
      },
    },
    progressWidth: {
      description: "進度條寬度，如超過直徑，可達成圓餅圖效果。",
      table: {
        type: {
          summary: "number",
          detail: "預設值為 70",
        },
      },
    },
    size: {
      description: "環狀進度條直徑。",
      table: {
        type: {
          summary: "number",
          detail: "預設值為 200",
        },
      },
    },
    defaultColor: {
      description: "環狀進度條背景色",
      table: {
        type: {
          summary: "string",
          detail: "預設值為 #ccc",
        },
      },
    },
    containerBackgroundColor: {
      description: "環狀進度條內容物背景色",
      table: {
        type: {
          summary: "string",
          detail: "預設值為 #eee",
        },
      },
    },
    children: {
      description: "環狀進度條內容物",
      table: {
        type: {
          summary: "React.ReactElements",
          detail: "預設值為 null",
        },
      },
    },
  },
  parameters: {
    docs: {
      page: () => {
        return (
          <DocWrapper>
            <Title />
            <Subtitle />
            <Description />
            {/*@ts-ignore*/}
            <Preview isExpanded withToolbar={true}>
              <div className="story">
                <Story id="資料呈現-環狀進度條-circularprogress--primary" />
              </div>
            </Preview>
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </DocWrapper>
        );
      },
    },
  },
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = (args) => (
  <CircularProgress {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  percentage: 30,
  progressingColor: "orange",
  doublePercentage: 10,
  doubleColor: "darkolivegreen",
  double: true,
  size: 200,
  progressWidth: 70,
  defaultColor: "#ccc",
  containerBackgroundColor: "#eee",
  children: (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    />
  ),
};

const DocWrapper = styled.div`
  max-width: 1000px;
  overflow-x: auto;
  & thead > tr > th:nth-child(3) {
    display: none;
  }
  & tbody > tr > td:nth-child(3) {
    display: none;
  }
  & .sbdocs-expandable {
    & > span {
      line-height: 1.5rem;
      white-space: pre-line;
      max-width: 200px;
      width: 200px;
      word-break: break-all;
    }
  }
  & .story {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
