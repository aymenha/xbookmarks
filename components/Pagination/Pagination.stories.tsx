import React from "react";
import { host } from "storybook-host";
import { Pagination, PaginationProps } from "./Pagination";

const Host = host({
  align: "center middle",
  background: false,
  backdrop: true,
});

const testData: PaginationProps = {
  count: 570,
  currentPage: 1,
  perPage: 50,
};

export const Default = () => <Pagination {...testData} />;

export default {
  title: "Pagination",
  decorators: [Host],
};
