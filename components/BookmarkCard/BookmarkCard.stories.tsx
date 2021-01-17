import React from "react";
import { host } from "storybook-host";
import { BookmarkCard, BookmarkCardProps } from "./BookmarkCard";

const Host = host({
  align: "center middle",
  background: true,
  backdrop: true,
});

const testData: BookmarkCardProps = {
  bookmark: {
    title: "hello",
    icon: "",
    href: "https://www.google.com",
    createdAt: new Date().getTime(),
  },
};

export const Default = () => <BookmarkCard {...testData} />;

export default {
  title: "Bookmark Card",
  decorators: [Host],
};
