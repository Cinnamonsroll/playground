import { TTools, Element, Selection, Coordinates } from "@/types/interfaces";
import { atom } from "jotai";

export const tools = atom<TTools>({
    select: true,
    square: false,
    circle: false,
    diamond: false,
    text: false,
    move: false
});

export const selection = atom<Selection>({ x: 0, y: 0, width: 0, height: 0 })
export const position = atom<Coordinates>({ x: 0, y: 0 })
export const elements = atom<Element[]>([]);
export const selected = atom<Number | null>(null);