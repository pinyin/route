import faker from 'faker'
import {createSerializer} from './createSerializer'
import {UserProjectRoute, UserProjectTemplate} from './mocks/UserProject'

describe(`${createSerializer.name}`, () => {
    test(`should return a serializer`, () => {
        const serializer = createSerializer<UserProjectRoute>(UserProjectTemplate)

        for (let i = 0; i < 10; i++) {
            const route: UserProjectRoute = {
                userID: faker.random.words(),
                projectID: faker.random.words(),
                scroll: faker.random.number(),
                search: faker.random.words()
            }

            const url = `/user/${encodeURIComponent(route.userID)}/project/${encodeURIComponent(route.projectID)}?${encodeURIComponent(route.search)}#${encodeURIComponent(route.scroll.toString())}`

            expect(serializer.serialize(route)).toEqual(url)
        }
    })
})
