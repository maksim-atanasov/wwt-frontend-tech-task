import { isOptionSelected } from '@/entities/filter'
import { FilterItem } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest'
import CheckIcon from '@/shared/assets/icons/check.svg'

interface FilterSectionProps {
	item: FilterItem
	filter: SearchRequestFilter
	onToggle: (filterId: string, optionId: string) => void
}

export const FilterSection = ({
	item,
	filter,
	onToggle
}: FilterSectionProps) => (
	<fieldset className="border-t border-gray-300 py-8">
		<legend className="contents">
			<span className="block text-2xl font-medium">{item.name}</span>
		</legend>
		<ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
			{item.options.map(option => (
				<li key={option.id}>
					<label
						className="flex w-fit cursor-pointer items-center gap-4"
						title={option.description}
					>
						<span className="relative flex shrink-0">
							<input
								type="checkbox"
								className="peer size-5 cursor-pointer appearance-none rounded-[3px] border-2 border-gray-500 transition-colors checked:border-brand checked:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
								checked={isOptionSelected(filter, item.id, option.id)}
								onChange={() => onToggle(item.id, option.id)}
							/>
							<CheckIcon className="pointer-events-none absolute inset-0.5 hidden size-4 text-white peer-checked:block" />
						</span>
						<span className="text-sm">{option.name}</span>
					</label>
				</li>
			))}
		</ul>
	</fieldset>
)
