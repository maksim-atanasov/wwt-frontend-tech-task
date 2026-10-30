import { ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'link'

interface ButtonProps extends ComponentProps<'button'> {
	variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
	primary:
		'rounded-xl bg-brand px-16 py-4 text-sm font-semibold text-white hover:bg-brand-hover',
	secondary:
		'rounded-xl border border-gray-400 px-16 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100',
	link: 'text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover'
}

export const Button = ({
	variant = 'primary',
	type = 'button',
	className = '',
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={`cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50 ${variantClassNames[variant]} ${className}`}
		{...props}
	/>
)
