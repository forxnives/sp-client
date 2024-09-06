import { BiRegularTrendingDown, BiRegularTrendingUp } from "solid-icons/bi"

function SmallIndicatorTile({ title, status }) {
	return (
		<div class='rounded-lg h-8 w-14 px-2 bg-black bg-opacity-30 flex flex-row items-center justify-around'>
			<div class='flex flex-col'>
				<div class='text-neutral-200 text-xs'>{title}</div>
			</div>
			<div class='flex justify-center pl-1 items-center'>
				<BiRegularTrendingUp color='#139602' size={18} />
			</div>
		</div>
	)
}

export default SmallIndicatorTile
