import React from "react";
import { host } from "storybook-host";
import { BookmarkCard } from "./BookmarkCard";

const Host = host({
  align: "center middle",
  background: true,
  backdrop: true,
});

export const Default = () => <BookmarkCard title="hello" icon="" href="" />;

export default {
  title: "Bookmark Card",
  decorators: [Host],
};
