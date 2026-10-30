import { FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest'

export const isOptionSelected = (
	filter: SearchRequestFilter,
	filterId: string,
	optionId: string
) =>
	filter.some(
		item => item.id === filterId && item.optionsIds.includes(optionId)
	)

export const toggleOption = (
	filter: SearchRequestFilter,
	filterId: string,
	optionId: string
): SearchRequestFilter => {
	const current = filter.find(item => item.id === filterId)

	if (!current) {
		return [
			...filter,
			{ id: filterId, type: FilterType.OPTION, optionsIds: [optionId] }
		]
	}

	const optionsIds = current.optionsIds.includes(optionId)
		? current.optionsIds.filter(id => id !== optionId)
		: [...current.optionsIds, optionId]

	if (!optionsIds.length) {
		return filter.filter(item => item.id !== filterId)
	}

	return filter.map(item =>
		item.id === filterId ? { ...item, optionsIds } : item
	)
}
