import type { User } from '~/types'

export const UserApi = {
  list() {
    return new Promise<GeneratePageResult<User>>((resolve) => {
      resolve({
        code: 0,
        data: {
          records: Array.from({ length: 15 }, (_, idx) => {
            return {
              id: idx,
              username: getRandomStr(8),
              name: getRandomStr(5),
              roleId: getRandomInteger(10) + 1,
              createTime: getRandomDateStr(),
              updateTime: getRandomDateStr(),
            }
          }),
          total: 15,
        },
      })
    })
  },
}
