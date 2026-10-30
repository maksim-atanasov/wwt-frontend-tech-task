import { ComponentProps, MouseEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@/shared/assets/icons/close.svg'

interface DialogProps
	extends Omit<ComponentProps<'dialog'>, 'open' | 'onClose'> {
	isOpen: boolean
	onClose: () => void
}

export const Dialog = ({
	isOpen,
	onClose,
	className = '',
	children,
	...props
}: DialogProps) => {
	const { t } = useTranslation()
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	useEffect(() => {
		const dialog = dialogRef.current

		if (!dialog) {
			return
		}

		if (isOpen && !dialog.open) {
			dialog.showModal()
		} else if (!isOpen && dialog.open) {
			dialog.close()
		}
	}, [isOpen])

	// The dialog has no padding, so only a click on the backdrop targets it directly
	const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] rounded-2xl bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/40 ${className}`}
			onClose={onClose}
			onClick={handleBackdropClick}
			{...props}
		>
			<div className="relative px-6 py-8 md:px-8">
				<button
					type="button"
					className="absolute top-8 right-6 cursor-pointer rounded-md p-1 text-gray-900 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-brand md:right-8"
					onClick={onClose}
				>
					<CloseIcon className="size-6" />
					<span className="sr-only">{t('close')}</span>
				</button>
				{children}
			</div>
		</dialog>
	)
}
