import Tool from "./ToolR";
export default function Color({ actionEnter, actionLeave }: any) {
  return (
    <>
      <Tool icon="paint-brush" tool={"color"} actionEnter={actionEnter} actionLeave={actionLeave}/>
    </>
  );
}
