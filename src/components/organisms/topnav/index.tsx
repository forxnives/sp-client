import { SelectTicker } from "../../molecules/selectticker"
import { AiOutlineMenu, AiOutlineBell } from "solid-icons/ai"

function TopNav({ symbols, setSelectedSymbol, selectedSymbol }) {
	return (
		<div class='h-16 pt-2 px-4 flex flex-row w-full items-center justify-between'>
			<div class='flex align-middle p-1'>
				<AiOutlineMenu size={24} color='#fff' />;
			</div>
			<SelectTicker
				selectedItem={selectedSymbol}
				items={symbols}
				setSelectedItem={setSelectedSymbol}
			/>
			<div class='flex align-middle p-1'>
				<AiOutlineBell size={24} color='#fff' />;
			</div>
		</div>
	)
}

export default TopNav
