import {Deserializer} from './Deserializer'
import {Dynamic} from './Dynamic'
import {isQueryPattern, QueryPattern} from './QueryPattern'
import {SegmentPattern} from './SegmentPattern'

export function createDeserializer<R>(pattern: SegmentPattern<R>): { deserialize: Deserializer<R> } {
    const matchPath = (segments: Array<string>, pattern: SegmentPattern<R>): QueryPattern<R> => {
        const [segment, ...rest] = segments

        const nextPattern = pattern[segment] ?
            pattern[segment] :
            pattern[Dynamic](segment || '')

        return isQueryPattern(nextPattern) ?
            nextPattern :
            matchPath(rest, nextPattern)
    }

    return {
        deserialize: (url: string) => {
            const queryFrom = url.indexOf('?') >= 0 ? url.indexOf('?') : url.length
            const fragmentFrom = url.indexOf('#') >= 0 ? url.indexOf('#') : url.length

            const path = url.slice(0, Math.min(queryFrom, fragmentFrom))
            const pathSegments = path.split('/').map(path => decodeURIComponent(path))
            while (pathSegments[0] === '') {
                pathSegments.shift()
            }
            const queryPattern = matchPath(pathSegments, pattern)

            const query = decodeURIComponent(url.slice(queryFrom + 1, fragmentFrom))
            const fragment = decodeURIComponent(url.slice(fragmentFrom + 1, url.length))

            return queryPattern(query, fragment)
        }
    }
}
