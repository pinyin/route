import {Dynamic} from '../Dynamic'
import {SegmentPattern} from '../SegmentPattern'
import {Template} from '../Template'
import {URIParts} from '../URIParts'

function unexpected(route: string): any {
    throw new Error(`unexpected route ${route}`)
}

export type UserProjectRoute = {
    userID: string
    projectID: string
    search: string
    scroll: number
}

export const UserProjectPattern: SegmentPattern<UserProjectRoute> = {
    user: {
        [Dynamic]: (userID: string) => ({
            project: {
                [Dynamic]: (projectID: string) =>
                    (query: string, fragment: string) =>
                        ({userID, projectID, search: query, scroll: JSON.parse(fragment)})
            },
            [Dynamic]: unexpected
        })
    },
    [Dynamic]: unexpected
}

export const UserProjectTemplate: Template<UserProjectRoute> = (route: UserProjectRoute): URIParts => {
    return {
        paths: ['user', route.userID, 'project', route.projectID],
        fragment: JSON.stringify(route.scroll),
        query: route.search
    }
}
