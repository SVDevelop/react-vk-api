import React, {useState} from "react";
import Input from "../components/Input";
import SearchGroups from "../components/SearchGroups";

export default function Home ({ onEnter, state, wallGet }) {

  return (
    <div className="container">
      <Input onEnter={onEnter} />
      <SearchGroups state={state} wallGet={wallGet} />
    </div>
  );
}
