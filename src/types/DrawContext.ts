export type DrawContextType = {
    color: string | null,
    setColor: (color: string) => void,
    setThickness: (value: number | number[]) => void;
    thickness: number,
};
