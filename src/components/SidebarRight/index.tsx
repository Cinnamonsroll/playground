import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { FC, RefObject, useMemo, useState } from "react";
import Tooltip from "../ui/Tooltip";
import { TTools, Element } from "@/types/interfaces";
import * as state from "@/lib/state";
import Color from "./Tools/Color";
import Delete from "./Tools/Delete";
const SidebarRight: FC = () => {
  const [elements, setElements] = useAtom(state.elements);
  const [selected, setSelected] = useAtom(state.selected);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [tools]: [TTools, any] = useAtom(state.tools);
  const active = useMemo(
    () => Object.keys(tools).find((k: string) => (tools as any)[k]),
    [tools]
  );
  const colors = [
    "bg-red-600",
    "bg-amber-600",
    "bg-yellow-600",
    "bg-green-600",
    "bg-blue-600",
    "bg-violet-600",
    "bg-gray-600",
  ];
  return (
    <div className="absolute z-40 pointer-events-none inset-y-0 right-[20px] flex items-center">
      <div
        className={
          "flex flex-col px-1.5 pointer-events-auto py-2 gap-y-1 drop-shadow-2xl bg-base-900 border border-base-850 rounded-xl " +
          (showColors ? "rounded-l-none" : "")
        }
      >
        {!["text"].includes(
          (
            elements.find(
              (el: Element, i: number) => el.id === selected
            ) as Element
          ).type
        ) && <Color
          actionEnter={() => {
            setShowColors(true);
          }}
          actionLeave={() => {
            setShowColors(false);
          }}
        />}
        <Delete actionEnter={() => {
          setSelected(null);
          setElements(elements.filter((el: Element) => el.id !== selected))
        }}/>
        <AnimatePresence>
          {showColors && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className={`absolute z-50 pointer-events-none inset-y-0 top-[3px] right-[57px]`}
            >
              <div className="flex flex-row gap-5 px-1.5 pointer-events-auto py-2 gap-y-1 drop-shadow-2xl bg-base-900 border border-base-850 rounded-xl border-r-0 rounded-r-none">
                {colors.map((color: string, i: number) => {
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => {
                        setShowColors(true);
                        setElements(
                          elements.map((el: Element) => {
                            if (el.id !== selected) return el;
                            else {
                              return {
                                ...el,
                                extra: {
                                  color,
                                },
                              };
                            }
                          })
                        );
                      }}
                      onMouseLeave={() => {
                        setShowColors(false);
                      }}
                      className={"w-10 h-10 rounded-lg " + color}
                    ></div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarRight;
