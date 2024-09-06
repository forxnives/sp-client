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
	date: number
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
	const [selectedSymbol, setSelectedSymbol] = createSignal<SelectItem>()
	const [currentCandle, setCurrentCandle] = createSignal<CandleStick>()
	const [indicators, setIndicators] = createSignal<Indicators>()

	const [symbols] = createResource(async () => {
		return await getData({ path: "/symbols" })
	})

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

	return (
		<div class='h-lvh w-screen'>
			<TopNav
				symbols={symbols}
				selectedSymbol={selectedSymbol}
				setSelectedSymbol={setSelectedSymbol}
			/>
			<Show when={currentCandle()?.close}>
				<div class='pl-4 absolute text-xl text-[#3A697B]'>{`${
					currentCandle().close
				}`}</div>
			</Show>
			<Chart
				selectedSymbol={selectedSymbol}
				setCurrentCandle={setCurrentCandle}
				data={historicData}
				refetchHistoric={refetch}
			/>

			<BottomDrawer indicators={indicators} />
		</div>
	)
}

export default App
