import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { toggleOption, useFilterItems, useFilterStore } from '@/entities/filter'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'

import { ApplyConfirmDialog } from './ApplyConfirmDialog'
import { FilterSection } from './FilterSection'

interface FilterModalProps {
	onClose: () => void
}

// Mount only while open: the draft is initialised from the saved filter on every opening
export const FilterModal = ({ onClose }: FilterModalProps) => {
	const { t } = useTranslation(['filter', 'common'])
	const savedFilter = useFilterStore(state => state.filter)
	const setFilter = useFilterStore(state => state.setFilter)
	const { data: filterItems, isPending, isError } = useFilterItems()

	const [draft, setDraft] = useState(savedFilter)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const handleToggle = (filterId: string, optionId: string) =>
		setDraft(current => toggleOption(current, filterId, optionId))

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsConfirmOpen(true)
	}

	const handleConfirm = () => {
		setFilter(draft)
		onClose()
	}

	return (
		<Dialog
			isOpen
			onClose={onClose}
			className="max-w-6xl"
		>
			<form onSubmit={handleSubmit}>
				<header className="pb-8">
					<h2 className="text-center text-4xl font-medium">{t('title')}</h2>
				</header>

				{isPending && (
					<p className="py-8 text-center text-gray-500">
						{t('common:loading')}
					</p>
				)}
				{isError && (
					<p className="py-8 text-center text-red-600">{t('common:error')}</p>
				)}
				{filterItems?.map(item => (
					<FilterSection
						key={item.id}
						item={item}
						filter={draft}
						onToggle={handleToggle}
					/>
				))}

				<footer className="grid grid-cols-1 items-center gap-6 border-t border-gray-300 pt-6 md:grid-cols-3">
					<Button
						type="submit"
						className="justify-self-center md:col-start-2"
						disabled={!filterItems}
					>
						{t('apply')}
					</Button>
					<Button
						variant="link"
						className="justify-self-center md:justify-self-end"
						disabled={!draft.length}
						onClick={() => setDraft([])}
					>
						{t('clearAll')}
					</Button>
				</footer>
			</form>

			<ApplyConfirmDialog
				isOpen={isConfirmOpen}
				onConfirm={handleConfirm}
				onDecline={onClose}
				onClose={() => setIsConfirmOpen(false)}
			/>
		</Dialog>
	)
}
