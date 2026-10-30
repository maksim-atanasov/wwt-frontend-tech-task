import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/entities/filter'
import { FilterModal } from '@/features/filter-modal'
import { Button } from '@/shared/ui/Button'

export const App = () => {
	const { t } = useTranslation('filter')
	const filter = useFilterStore(state => state.filter)
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center gap-10 px-4 py-12">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-center text-4xl text-gray-600 md:text-6xl">
				WinWinTravel frontend test task
			</h1>

			<Button onClick={() => setIsFilterOpen(true)}>{t('open')}</Button>

			<section className="w-full">
				<h2 className="mb-2 text-lg font-medium text-gray-700">
					{t('selected')}
				</h2>
				<pre className="overflow-x-auto rounded-xl bg-gray-100 p-4 text-sm">
					<code>{JSON.stringify(filter, null, 2)}</code>
				</pre>
			</section>

			{isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
		</main>
	)
}
