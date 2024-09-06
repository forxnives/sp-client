import { createReconnectingWS } from "@solid-primitives/websocket"
import { createEffect } from "solid-js"
import CandleStickChart from "./candleStickChart.js"
import { CandleStick } from "../../../App.jsx"

const updateCandle = (
	lastCandle: CandleStick,
	newPrice: number
): CandleStick => {
	return {
		...lastCandle,
		open: lastCandle.open,
		high: lastCandle.high > newPrice ? lastCandle.high : newPrice,
		low: lastCandle.low < newPrice ? lastCandle.low : newPrice,
		close: newPrice,
	}
}

function Chart({ data, setCurrentCandle, selectedSymbol, refetchHistoric }) {
	let chart

	const ws = createReconnectingWS("ws://192.168.0.149:3001/ws")

	ws.addEventListener("message", async (ev) => {
		const message = await JSON.parse(ev.data)

		if (message.onBarComplete) {
			refetchHistoric()
			return
		}
		const newBidPrice = message[selectedSymbol().value]?.bid
		if (!newBidPrice) return

		const candleData = data()

		setCurrentCandle((c) => {
			const updatedCandle = updateCandle(c, newBidPrice)
			candleData[candleData.length - 1] = updatedCandle
			chart.setData(candleData)
			return updatedCandle
		})
	})

	createEffect(() => {
		if (!data()) return

		const priceData = data()
		chart = new CandleStickChart(
			window.innerWidth - 10,
			Math.round(window.innerHeight / 1.3),
			priceData,
			"chart1"
		)

		setCurrentCandle(priceData[priceData.length - 1])
		chart.draw()

		window.addEventListener("resize", () => {
			chart.setConfig({
				width: window.innerWidth / 2,
				height: Math.round(window.innerHeight / 1.3),
			})
			chart.draw()
		})
	})

	return <div id='chart1'></div>
}

export default Chart
