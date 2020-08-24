import React, { useEffect } from "react";
import Container from "./Container";

const Page = (props) => {
  useEffect(() => {
    document.title = `${props.title} About Us | SocialApp`;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <Container wide={props.wide}>{props.children}</Container>;
};

export default Page;
