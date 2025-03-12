import { ElementType, ReactNode } from 'react';

type TitleProps<T extends ElementType = 'h1'> = {
	as?: T;
	children?: ReactNode;
} & React.ComponentPropsWithoutRef<T>; // 允許該標籤的原生屬性

const Title = <T extends ElementType = 'h1'>({
	as,
	children,
	className = '',
	...props
}: TitleProps<T>) => {
	const Component = as || 'h1';

	return (
		<Component
			className={`w-full my-8 text-center text-4xl capitalize ${className}`}
			{...props}>
			{children}
		</Component>
	);
};

export default Title;
