import { useQuery } from '@tanstack/vue-query'
import { Group } from '../models/group.model'
import { renameTree } from '@/common/utils/renameTree'
import { Assignment } from '../../users/models/assignment.model'

export const useGroups = () => {
  const {
    data: groups,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const groups = await Group.getAll()
      const groupsData = groups.data ? groups.data : groups
      return renameTree(groupsData.length ? groupsData : [groupsData], 'name_group', 'id_group')
    }

  })
  return { groups, isPending, isSuccess, error, isError, refetch, isRefetching }
}
export const useGroupsWithTest = () => {
  const {
    data: groups,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const groups = await new Group().getAll({ relations: ['psiTests'] })
      const groupsData = groups.data ? groups.data : groups
      return renameTree(groupsData.length ? groupsData : [groupsData], 'name_group', 'id_group')
    }

  })
  return { groups, isPending, isSuccess, error, isError, refetch, isRefetching }
}
