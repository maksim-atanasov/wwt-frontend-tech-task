import { useQuery } from '@tanstack/react-query'

import { getFilterItems } from '@/shared/api/filter'

export const filterItemsQueryKey = ['filter', 'items'] as const

export const useFilterItems = () =>
	useQuery({
		queryKey: filterItemsQueryKey,
		queryFn: getFilterItems,
		staleTime: Infinity
	})
