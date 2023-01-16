import Tool from "./ToolR";
export default function Delete({ actionEnter }: any) {
  return (
    <>
      <Tool
        icon="trash"
        tool={"delete"}
        actionEnter={actionEnter}
      />
    </>
  );
}
