import {SegmentPattern} from './SegmentPattern'

export type QueryPattern<R> = (query: string, fragment: string) => R

export function isQueryPattern(obj: QueryPattern<any> | SegmentPattern<any>): obj is QueryPattern<any> {
    return obj instanceof Function
}
