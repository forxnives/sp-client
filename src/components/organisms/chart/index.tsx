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
		high: lastCandle.high,
		low: lastCandle.low,
		close: newPrice,
	}
}

function Chart({ data, setCurrentPrice, selectedSymbol, refetchHistoric }) {
	let chart

	// const socket = makeHeartbeatWS(
	// 	makeReconnectingWS(`ws://192.168.0.149:3001/ws`, undefined, {
	// 		timeout: 500,
	// 	}),
	// 	{ message: "👍" }
	// )

	const ws = createReconnectingWS("ws://192.168.0.149:3001/ws")

	ws.addEventListener("message", async (ev) => {
		// just for testing, will need to get new data from websocket

		const message = await JSON.parse(ev.data)

		if (message.onBarComplete) {
			refetchHistoric()
			return
		}

		const newBidPrice = message[selectedSymbol().value]?.bid

		if (!newBidPrice) {
			return
		}

		const candleData = data()
		const lastCandle = candleData[candleData.length - 1]

		candleData[candleData.length - 1] = updateCandle(
			lastCandle,
			newBidPrice
		)

		chart.setData(candleData)
		setCurrentPrice(newBidPrice)
	})

	createEffect(() => {
		if (data()) {
			const priceData = data()
			chart = new CandleStickChart(
				window.innerWidth - 10,
				Math.round(window.innerHeight / 1.3),
				priceData,
				"chart1"
			)

			setCurrentPrice(priceData[priceData.length - 1].close)
			chart.draw()

			window.addEventListener("resize", () => {
				chart.setConfig({
					width: window.innerWidth / 2,
					height: Math.round(window.innerHeight / 1.3),
				})
				chart.draw()
			})
		}
	})

	return <div id='chart1'></div>
}

export default Chart
