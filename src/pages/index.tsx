import SidebarLeft from "@/components/SidebarLeft";
import useMouseSelection from "@/lib/useMouseSelection";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { TTools, Element } from "@/types/interfaces";
import * as state from "@/lib/state";
import SidebarRight from "@/components/SidebarRight";
export default function Home() {
  const [tools, setTools]: [TTools, any] = useAtom(state.tools);
  const [selected, setSelected] = useAtom(state.selected);
  const [elements, setElements] = useAtom(state.elements);
  function setActive(tool: string) {
    const newTools = Object.keys(tools).reduce((a, k) => {
      return { ...a, [k]: false };
    }, tools);
    setTools({
      ...newTools,
      [tool]: true,
    });
  }
  const active = useMemo(
    () => Object.keys(tools).find((k: string) => (tools as any)[k]),
    [tools]
  );
  const [selection] = useMouseSelection();
  function startMoving(e: any, id: number) {
    if (active === "move") {
      e.preventDefault();
      setSelected(id);
    }
  }
  function move(e: any) {
    if (!selected || active !== "move") return;
    setElements(
      elements.map((el: Element) => {
        if (el.id !== selected) return el;
        else {
          return {
            ...el,
            x: e.x,
            y: e.y,
          };
        }
      })
    );
  }
  function onKey(e: any) {
    if (e.ctrlKey && e.keyCode === 68) {
      if (selected !== null) {
        const { type } = elements.find(
          (el: Element, i: number) => el.id === selected
        ) as Element;
        if (type === "text") {
          e.preventDefault();
          setElements(elements.filter((el: Element) => el.id !== selected));
        }
      }
    } else if (e.ctrlKey && e.keyCode === 68) {
      e.preventDefault();
      if (selected !== null) {
        const { x, y, width, height, type, extra, id } = elements.find(
          (el: Element, i: number) => el.id === selected
        ) as Element;
        setElements([
          ...elements,
          {
            id: elements.length + 1,
            width,
            height,
            type,
            extra,
            x: x + 20,
            y: y + 20,
          },
        ]);
        setSelected(elements.length + 1);
      }
    } else if (e.keyCode === 49) {
      e.preventDefault();
      setActive("select");
    } else if (e.keyCode === 50) {
      e.preventDefault();
      setActive("move");
    } else if (e.keyCode === 51) {
      e.preventDefault();
      setActive("text");
    } else if (e.keyCode === 52) {
      e.preventDefault();
      setActive("square");
    } else if (e.keyCode === 53) {
      e.preventDefault();
      setActive("circle");
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, [selected]);
  useEffect(() => {
    document.addEventListener("mouseup", () => setSelected(null));
    return () =>
      document.removeEventListener("mouseup", () => setSelected(null));
  }, [selected]);

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SidebarLeft />
      {selected && <SidebarRight />}
      {elements.map((element: Element) => {
        const classes = {
          square: `absolute rounded-md ${
            active === "select" && selected === element.id
              ? "border-2 border-dashed border-blue-600"
              : "border-black border-2"
          } ${element.extra?.color || "bg-red-600"}`,
          circle: `absolute rounded-full ${
            active === "select" && selected === element.id
              ? "border-2 border-dashed border-blue-600"
              : "border-black border-2"
          } ${element.extra?.color || "bg-red-600"}`,
          diamond: `absolute rounded-md rotate-45 ${
            active === "select" && selected === element.id
              ? "border-2 border-dashed border-blue-600"
              : "border-black border-2"
          } ${element.extra?.color || "bg-red-600"}`,
        };
        return (
          <>
            {element.type === "text" ? (
              <>
                {element.extra?.text && (
                  <div
                    key={element.id}
                    onMouseDown={(e) => {
                      if (active === "move") startMoving(e, element.id);
                    }}
                    onClick={() => {
                      if (active === "select") setSelected(element.id);
                    }}
                    className={`absolute z-50 ${
                      active === "select" && selected === element.id
                        ? "border-2 border-dashed border-blue-600"
                        : ""
                    }`}
                    style={{
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                    }}
                  >
                    <p
                      contentEditable={selected === element.id}
                      className="text-white text-sm"
                    >
                      {element.extra?.text}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div
                onMouseDown={(e) => {
                  if (active === "move") startMoving(e, element.id);
                }}
                onClick={() => {
                  if (active === "select") setSelected(element.id);
                }}
                key={element.id}
                className={(classes as any)[element.type]}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                }}
              />
            )}
          </>
        );
      })}
      {active === "circle" && (selection.width > 0 || selection.height > 0) && (
        <div
          className="absolute bg-red-600 rounded-full"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}
      {active === "select" && (selection.width > 0 || selection.height > 0) && (
        <div
          className="absolute border-2 border-blue-600 bg-blue-600/20 rounded-xl"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}
      {active === "text" && (selection.width > 0 || selection.height > 0) && (
        <div
          className="absolute border-2 border-gray-600 bg-gray-600/20 rounded-xl"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}
      {active === "square" && (selection.width > 0 || selection.height > 0) && (
        <div
          className="absolute bg-red-600 rounded-md"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}
      {active === "diamond" && (selection.width > 0 || selection.height > 0) && (
        <div
          className="absolute bg-red-600 rounded-md rotate-45"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}
    </>
  );
}
