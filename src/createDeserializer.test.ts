import faker from 'faker'
import {createDeserializer} from './createDeserializer'
import {createSerializer} from './createSerializer'
import {UserProjectPattern, UserProjectRoute, UserProjectTemplate} from './mocks/UserProject'

describe(`${createDeserializer.name}`, () => {
    test(`should return a deserializer`, () => {
        const serialize = createSerializer<UserProjectRoute>(UserProjectTemplate)
        const deserialize = createDeserializer<UserProjectRoute>(UserProjectPattern)

        for (let i = 0; i < 10; i++) {
            const route: UserProjectRoute = {
                userID: faker.random.words(),
                projectID: faker.random.words(),
                scroll: faker.random.number(),
                search: faker.random.words()
            }
            const url = serialize(route)
            const deserializedRoute = deserialize(url)
            expect(deserializedRoute).toEqual(route)
        }
    })
})
