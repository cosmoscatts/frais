import type { Role } from '~/types'

export const RoleApi = {
  list() {
    return new Promise<GeneratePageResult<Role>>((resolve) => {
      resolve({
        code: 0,
        data: {
          records: Array.from({ length: 3 }).map((_, idx) => {
            return {
              id: idx + 1,
              name: ['管理员', '用户', '用户2'][idx],
              description: [
                '拥有管理员权限，可以对普通用户进行一些操作',
                '拥有普通用户权限，可以查看基础页面',
                '拥有普通用户权限，可以查看基础页面',
              ][idx],
              createTime: getRandomDateStr(),
              updateTime: getRandomDateStr(),
              menuIdList: [
                [101, 102, 10201, 10202],
                [101],
                [101, 10201],
              ][idx],
            }
          }),
          total: 3,
        },
      })
    })
  },
}
