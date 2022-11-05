import Pencil from '../../images/icons/pencil.svg'
import Bucket from '../../images/icons/bucket.svg'

export enum INSTRUMENTS {
    SELECT_SHAPE = 'select_shape',
    SELECT_RECTANGLE = 'select_rectangle',
    ERASER = 'eraser',
    BUCKET = 'bucket',
    PIPETTE = 'pipette',
    LENS = 'lens',
    PENCIL = 'pencil',
    BRUSH = 'brush',
    SPRAY = 'spray',
    TEXT = 'text',
    LINE = 'line',
    CURVE = 'curve',
    RECTANGLE = 'rectangle',
    SHAPE = 'shape',
    CIRCLE = 'circle',
    ELLIPSE = 'ellipse',
}

export const instrumentIcons: Record<string, string> = {
    pencil: Pencil,
    bucket: Bucket,
}
