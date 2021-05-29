import React from "react";
import Input from "../components/Input";
import SearchGroups from "../components/SearchGroups";

export default function Main({ onEnter, state, wallGet }) {
  return (
    <>
      <Input onEnter={onEnter} />
      <SearchGroups state={state} wallGet={wallGet} />
    </>
  );
}
