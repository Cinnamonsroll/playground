import Tooltip from "../../ui/Tooltip";
import { FC } from "react";
import clsx from "clsx";
interface Props {
  tool: string;
  icon: string;
  actionEnter?: any;
  actionLeave?: any
}

const Tool: FC<Props> = ({ tool, icon, actionEnter, actionLeave }) => {
  return (
    <Tooltip text={tool[0].toUpperCase() + tool.slice(1, tool.length)}>
      <button
        onMouseEnter={() => {
          if (actionEnter) actionEnter();
        }}
        onMouseLeave={() => {
          if (actionLeave) actionLeave();
        }}
        className={clsx(
          "focus:outline-none px-2.5 py-2 text-xl transition duration-200 ease-linear group rounded-xl",
          "text-zinc-400 hover:text-white focus:text-white focus:bg-base-850 hover:bg-base-850"
        )}
      >
        <span
          className={clsx(
            "inline-block transition duration-200 ease-linear will-change",
            "group-hover:scale-110"
          )}
        >
          <i className={`fa-regular fa-fw fa-${icon}`}></i>
        </span>
      </button>
    </Tooltip>
  );
};

export default Tool;
