import {
	makeHeartbeatWS,
	makeReconnectingWS,
	createReconnectingWS,
} from "@solid-primitives/websocket"
import { createEffect, createResource } from "solid-js"
import CandleStickChart, { parseDate } from "./candleStickChart.js"

function Chart() {
	const [data, { mutate, refetch }] = createResource(async () => {
		const result = await fetch("http://192.168.0.149:3001/historic")

		if (!result.ok) throw new Error("Failed to fetch data")
		return result.json()
	})

	let chart

	function convertData(input: [number, [number, number, number, number]][]): {
		date: string
		open: number
		high: number
		low: number
		close: number
	}[] {
		return input.map(([timestamp, [open, high, low, close]]) => {
			const date = timestamp
			return { date, open, high, low, close }
		})
	}

	const socket = makeHeartbeatWS(
		makeReconnectingWS(`ws://192.168.0.149:3001/ws`, undefined, {
			timeout: 500,
		}),
		{ message: "👍" }
	)

	const ws = createReconnectingWS("ws://192.168.0.149:3001/ws")

	ws.addEventListener("message", (ev) => {
		// just for testing, will need to get new data from websocket
		const oldData = convertData(data()?.data.price_data).sort(
			(a, b) => parseDate(a.date) - parseDate(b.date)
		)
		const lastItem = oldData[oldData.length - 1]

		oldData[oldData.length - 1] = {
			...lastItem,
			open: lastItem.open + 0.1,
			high: lastItem.high + 0.1,
			low: lastItem.low + 0.1,
			close: lastItem.close + 0.1,
		}

		chart.setData(oldData)
	})

	createEffect(() => {
		if (data()) {
			chart = new CandleStickChart(
				window.innerWidth,
				window.innerHeight - 50,
				convertData(data()?.data.price_data),
				"chart1"
			)
			chart.draw()

			window.addEventListener("resize", () => {
				chart.setConfig({
					width: window.innerWidth,
					height: window.innerHeight - 50,
				})
				chart.draw()
			})
		}
	})

	return <div id='chart1'></div>
}

export default Chart
