import { Show, createSignal } from "solid-js"
import IndicatorTile from "../../molecules/indicatortile"
import SmallIndicatorTile from "../../molecules/smallindicatortile"
import { BiRegularSignal5, BiSolidTimeFive } from "solid-icons/bi"
import NumberInput, { InputFormatOptions } from "../../atoms/numberinput"

const yTranslateMap = ["translate-y-[55%]", "translate-y-[30%]"]
const xTranslateMap = ["translate-x-[0%]", "translate-x-[-50%]"]

const BottomDrawer = ({ indicators }) => {
	const [modalPosition, setModalPosition] = createSignal<number>(0)
	const [isBuyMode, setIsBuyMode] = createSignal<boolean>(true)
	const [inputFormatOptions, setInputFormatOptions] =
		createSignal<InputFormatOptions>({
			minimumFractionDigits: 2,
			maximumFractionDigits: 4,
			style: "currency",
			currency: "USD",
		})

	const handleBuy = () => {
		setModalPosition(1)
		setIsBuyMode(true)
	}

	const handleSell = () => {
		setIsBuyMode(false)
		setModalPosition(1)
	}

	const handleCancel = () => {
		setModalPosition(0)
	}

	const handleConfirm = () => {
		setModalPosition(0)
	}

	return (
		<div
			class={`${
				yTranslateMap[modalPosition()]
			} transition overflow-hidden absolute bottom-0 w-full h-80 bg-[#202731] z-10 rounded-3xl`}
		>
			<div class='w-full flex justify-center align center'>
				<div class='rounded-full w-10 h-1 bg-white bg-opacity-10 mt-2'></div>
			</div>
			<Show when={indicators()}>
				<div
					class={`flex flex-row w-[200%] ${
						xTranslateMap[modalPosition()]
					} relative h-full transition`}
				>
					<div class='w-1/2 h-full'>
						<div class='flex mt-3 flex-row px-3 justify-center items-center space-x-3'>
							<IndicatorTile
								title={"EMA"}
								value={indicators().ema}
							/>
							<IndicatorTile
								title={"SSI"}
								value={indicators().ssi}
							/>
							<IndicatorTile
								title={"SSIEMA"}
								value={indicators().ssiema}
							/>
						</div>
						<div class='w-full h-16 items-center justify-center space-x-3 flex flex-row'>
							<SmallIndicatorTile
								title='Vol'
								status={indicators().vol}
							/>
							<div class='flex flex-row space-x-2'>
								<button
									onClick={handleBuy}
									class='w-28 h-10 rounded-md text-neutral-200 bg-[#5299D3]'
								>
									Buy
								</button>
								<button
									onClick={handleSell}
									class='w-28 h-10 rounded-md text-neutral-200 bg-[#C42B3B]'
								>
									Sell
								</button>
							</div>
							<div class='flex flex-row w-14 justify-center space-x-3 items-center'>
								<BiRegularSignal5 color='#139602' size={16} />
								<BiSolidTimeFive color='#139602' size={16} />
							</div>
						</div>
					</div>
					<div class='w-1/2 h-full flex flex-col items-center'>
						<div class='text-neutral-200 my-3 text-opacity-70'>
							Confirm Trade
						</div>
						<div class='flex flex-row justify-center space-x-4 w-full'>
							<NumberInput
								formatOptions={inputFormatOptions}
								label='SL'
							/>
							<NumberInput
								formatOptions={inputFormatOptions}
								label='TP'
							/>
						</div>
						<div class='flex mt-8 flex-row space-x-2'>
							<button
								onClick={handleConfirm}
								class='w-36 h-16 rounded-md text-neutral-200 bg-[#5299D3]'
							>
								Confirm
							</button>
							<button
								onClick={handleCancel}
								class='w-36 h-16 rounded-md text-neutral-200 bg-black'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</Show>
		</div>
	)
}

export default BottomDrawer
