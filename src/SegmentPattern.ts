import {Dynamic} from './Dynamic'
import {QueryPattern} from './QueryPattern'

export type SegmentPattern<R> = {
    [segment in string]: SegmentPattern<R> | QueryPattern<R>
} & {
    [Dynamic]: (segment: string) => SegmentPattern<R> | QueryPattern<R>
}
