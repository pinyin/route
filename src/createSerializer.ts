import {Serializer} from './Serializer'
import {Template} from './Template'
import {URIParts} from './URIParts'

export function createSerializer<R>(template: Template<R>): Serializer<R> {
    const sanitize = (uriParts: URIParts): URIParts => {
        return {
            paths: uriParts.paths ? uriParts.paths.map(path => encodeURIComponent(path)) : undefined,
            query: uriParts.query ? encodeURIComponent(uriParts.query) : undefined,
            fragment: uriParts.fragment ? encodeURIComponent(uriParts.fragment) : undefined
        }
    }

    return (route: R): string => {
        const result: URIParts = template(route)
        const sanitized = sanitize(result)
        return `${sanitized.paths ? `/${sanitized.paths.join('/')}` : ''}${sanitized.query ? `?${sanitized.query}` : ''}${sanitized.fragment ? `#${sanitized.fragment}` : ''}`
    }
}
