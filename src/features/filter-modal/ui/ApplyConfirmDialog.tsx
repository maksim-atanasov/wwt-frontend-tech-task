import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'

interface ApplyConfirmDialogProps {
	isOpen: boolean
	onConfirm: () => void
	onDecline: () => void
	onClose: () => void
}

export const ApplyConfirmDialog = ({
	isOpen,
	onConfirm,
	onDecline,
	onClose
}: ApplyConfirmDialogProps) => {
	const { t } = useTranslation('filter')

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-6xl"
		>
			<h2 className="px-10 text-center text-2xl font-medium md:text-3xl">
				{t('confirm.title')}
			</h2>
			<div className="mt-16 flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:gap-8">
				<Button
					variant="secondary"
					className="w-full max-w-72"
					onClick={onDecline}
				>
					{t('confirm.useOld')}
				</Button>
				<Button
					className="w-full max-w-72"
					onClick={onConfirm}
				>
					{t('confirm.applyNew')}
				</Button>
			</div>
		</Dialog>
	)
}
