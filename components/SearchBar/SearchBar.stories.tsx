import React from "react";
import { host } from "storybook-host";
import { SearchBar, SearchBarProps } from "./SearchBar";

const Host = host({
  align: "center middle",
  background: false,
  backdrop: true,
});

const testData: SearchBarProps = {
  query: "test query",
  onChange: () => {},
};

export const Default = () => <SearchBar {...testData} />;

export default {
  title: "SearchBar",
  decorators: [Host],
};
