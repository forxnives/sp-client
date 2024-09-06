import {
	Show,
	createEffect,
	createResource,
	createSignal,
	type Component,
} from "solid-js"
import Chart from "./components/organisms/chart"
import "solid-bottomsheet/styles.css"
import TopNav from "./components/organisms/topnav"
import { wait } from "./utils/time"
import { getData } from "./utils/httpUtils"
import BottomDrawer from "./components/organisms/bottomdrawer"
import { parseDate } from "./components/organisms/chart/candleStickChart.js"

export interface SelectItem {
	label: string
	value: string
	disabled?: boolean
}
export interface Indicators {
	ssi: string
	ema: string
	ssiema: string
	withinTimeWindow: boolean
	volumeStatus: "up" | "down" | "sideways"
}

export interface CandleStick {
	date: string
	open: number
	high: number
	low: number
	close: number
}

function convertData(
	input: [number, [number, number, number, number]][]
): CandleStick[] {
	return input.map(([timestamp, [open, high, low, close]]) => {
		const date = timestamp
		return { date, open, high, low, close }
	})
}

const App: Component = () => {
	const [symbols] = createResource(async () => {
		return await getData({ path: "/symbols" })
		// await wait(1000)
		// return [
		// 	{ label: "Dow 30", value: "DOW30" },
		// 	{ label: "USD/JPY", value: "USD/JPY", disabled: true },
		// ]
	})
	const [selectedSymbol, setSelectedSymbol] = createSignal<SelectItem>()
	const [currentPrice, setCurrentPrice] = createSignal<String>()
	const [indicators, setIndicators] = createSignal<Indicators>()

	const [historicData, { refetch }] = createResource(
		selectedSymbol,
		async () => {
			if (!selectedSymbol()) return null
			const res = await getData({
				path: `/historic/${selectedSymbol()
					.value.replace("/", "")
					.toLowerCase()}`,
			})
			return convertData(res.price_data).sort(
				(a, b) => parseDate(a.date) - parseDate(b.date)
			)
		}
	)

	createEffect(() => {
		const tickers = symbols()
		if (tickers && tickers.length) {
			setSelectedSymbol(tickers[0])
		}
	})

	createEffect(() => {
		const data = historicData()
		// do calculations for indicators if any
		// mocking
		setIndicators({
			ssi: "23.23",
			ssiema: "32.22",
			ema: "93.2",
			volumeStatus: "up",
			withinTimeWindow: true,
		})
	})

	// createEffect(() => {
	// 	const symbol = selectedSymbol()
	// })

	return (
		<div class='h-lvh w-screen'>
			<TopNav
				symbols={symbols}
				selectedSymbol={selectedSymbol}
				setSelectedSymbol={setSelectedSymbol}
			/>
			<Show when={currentPrice()}>
				<div class='pl-4 absolute text-xl text-[#3A697B]'>{`${currentPrice()}`}</div>
			</Show>
			<Chart
				selectedSymbol={selectedSymbol}
				setCurrentPrice={setCurrentPrice}
				data={historicData}
				refetchHistoric={refetch}
			/>

			<BottomDrawer indicators={indicators} />
		</div>
	)
}

export default App
