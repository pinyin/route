import faker from 'faker'
import {createDeserializer} from './createDeserializer'
import {createSerializer} from './createSerializer'
import {UserProjectPattern, UserProjectRoute, UserProjectTemplate} from './mocks/UserProject'

describe(`${createDeserializer.name}`, () => {
    test(`should return a deserializer`, () => {
        const serializer = createSerializer<UserProjectRoute>(UserProjectTemplate)
        const deserializer = createDeserializer<UserProjectRoute>(UserProjectPattern)

        for (let i = 0; i < 10; i++) {
            const route: UserProjectRoute = {
                userID: faker.random.words(),
                projectID: faker.random.words(),
                scroll: faker.random.number(),
                search: faker.random.words()
            }
            const url = serializer.serialize(route)
            const deserializedRoute = deserializer.deserialize(url)
            expect(deserializedRoute).toEqual(route)
        }
    })
})
