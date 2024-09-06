import { BiRegularTrendingDown, BiRegularTrendingUp } from "solid-icons/bi"

function IndicatorTile({ title, value }) {
	return (
		<div class='rounded-lg w-28 h-12 bg-black bg-opacity-30 flex flex-row items-center justify-around'>
			<div class='flex flex-col'>
				<div class='text-neutral-200 text-xs pt-1'>{title}</div>

				<div class={`text-[#3A697B]`}>{value()}</div>
			</div>
			<div class='rounded-full p-0 flex justify-center items center border border-[#139602]'>
				<BiRegularTrendingUp color='#139602' size={20} />
			</div>
		</div>
	)
}

export default IndicatorTile
