import React from "react";
import { host } from "storybook-host";
import { BookmarkCard } from "./BookmarkCard";

const Host = host({
  align: "center middle",
  background: true,
  backdrop: true,
});

const testData = {
  title: "hello",
  icon: "",
  href: "",
};

export const Default = () => <BookmarkCard bookmark={testData} />;

export default {
  title: "Bookmark Card",
  decorators: [Host],
};
