export type TTool = 'select' | 'move' | "text" | "square" | "circle" | "diamond";
export type TTools = {
    [key in TTool]: boolean;
};
export interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Coordinates {
    x: number;
    y: number;
}
export interface Element {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    type: "circle" | "square" | "text" | "diamond";
    extra?: any;
}