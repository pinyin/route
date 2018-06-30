import {URIParts} from './URIParts'

export type Template<R> = (route: R) => URIParts

