import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { FC, RefObject, useMemo, useState } from "react";
import Tooltip from "../ui/Tooltip";
import Circle from "./Tools/Circle";
import Select from "./Tools/Select";
import Text from "./Tools/Text";
import Square from "./Tools/Square";
import { TTools } from "@/types/interfaces";
import * as state from "@/lib/state";
import Move from "./Tools/Move";
import Diamond from "./Tools/Diamond";
const SidebarLeft: FC = () => {
  const [showShapes, setShowShapes] = useState<boolean>(false);
  const [tools]: [TTools, any] = useAtom(state.tools);
  const active = useMemo(
    () => Object.keys(tools).find((k: string) => (tools as any)[k]),
    [tools]
  );
  return (
    <div className="absolute z-40 pointer-events-none inset-y-0 left-[20px] flex items-center">
      <div
        className={
          "flex flex-col px-1.5 pointer-events-auto py-2 gap-y-1 drop-shadow-2xl bg-base-900 border border-base-850 rounded-xl " +
          (showShapes ? "rounded-br-none" : "")
        }
      >
        <Select />
        <Move />
        <Text />
        <Tooltip text={"Shapes"}>
          <button
            onClick={() => {
              setShowShapes(!showShapes);
            }}
            className="focus:outline-none px-2.5 py-2 text-xl transition duration-200 ease-linear group rounded-xl text-zinc-400 hover:text-white focus:text-white focus:bg-base-850 hover:bg-base-850"
          >
            <span className="inline-block transition duration-200 ease-linear will-change group-hover:scale-110">
              <i
                className={`fa-regular fa-fw fa-${
                  !(["select", "move", "text"].includes(active as string))
                    ? active
                    : "square"
                }`}
              ></i>
            </span>
          </button>
        </Tooltip>
        <AnimatePresence>
          {showShapes && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className={`absolute z-50 pointer-events-none inset-y-0 top-[143px] left-[57px]`}
            >
              <div className="flex flex-row px-1.5 pointer-events-auto py-2 gap-y-1 drop-shadow-2xl bg-base-900 border border-base-850 rounded-xl border-l-0 rounded-l-none">
                <Square />
                <Circle />
                <Diamond />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarLeft;