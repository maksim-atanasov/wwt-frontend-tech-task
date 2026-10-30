import { FilterItem } from '../types/Filter'

interface FilterItemsResponse {
	filterItems: FilterItem[]
}

// Emulates a network request until the real endpoint is available
export const getFilterItems = async (): Promise<FilterItem[]> => {
	const { default: response } = await import('../../temp/filterData.json')

	return (response as FilterItemsResponse).filterItems
}
