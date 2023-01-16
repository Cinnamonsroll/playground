import { Coordinates, Selection, TTools } from '@/types/interfaces';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import * as state from "@/lib/state";
function useMouseSelection(): [Selection] {
    const [selection, setSelection] = useAtom(state.selection);
    const [selected, setSelected] = useAtom(state.selected);
    const [elements, setElements] = useAtom(state.elements);
    const [creating, setCreating] = useState<boolean>(false);
    const [tools]: [TTools, any] = useAtom(state.tools);
    const active = useMemo(
        () => Object.keys(tools).find((k: string) => (tools as any)[k]),
        [tools]
    );

    useEffect(() => {
        let startX: number | null, startY: number | null;
        const handleMouseDown = (event: MouseEvent) => {

            startX = event.clientX;
            startY = event.clientY;
            setSelection({ x: startX, y: startY, width: 0, height: 0 });
            setCreating(true)

        };
        const handleMouseMove = (event: MouseEvent) => {
            if (startX && startY) {
                const x = Math.min(startX, event.clientX);
                const y = Math.min(startY, event.clientY);
                const width = Math.abs(event.clientX - startX);
                const height = Math.abs(event.clientY - startY);
                setSelection({ x, y, width, height });
            }
        };
        const handleMouseUp = (event: MouseEvent) => {
            setCreating(false);
            startX = null;
            startY = null;

        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    useEffect(() => {
        if (!creating && !(["select", "move"].includes(active as string))) {
            const timeout = setTimeout(() => {
                const { x, y, height, width } = selection;
                if(height > 100 || width > 100){
                if (active === "text") {
                    setElements([
                        ...elements,
                        {
                            id: elements.length + 1,
                            height,
                            width,
                            x,
                            y,
                            type: active as any,
                            extra: {
                                text: "This is placeholder text."
                            }
                        },
                    ]);
                } else {
                    setElements([
                        ...elements,
                        {
                            id: elements.length + 1,
                            height,
                            width,
                            x,
                            y,
                            type: active as any,
                        },
                    ]);
                }
            }
                setSelection({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                })
            }, 100);
            return () => clearTimeout(timeout);
        } else if (!creating && ["select", "move"].includes(active as string)) {
            setSelection({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            })
        }


    }, [creating])

    return [selection];
}

export default useMouseSelection;
