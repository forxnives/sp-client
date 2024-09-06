import { NumberInput as NumInput } from "@ark-ui/solid"
import { BiRegularCaretDown, BiRegularCaretUp } from "solid-icons/bi"

export interface InputFormatOptions {
	minimumFractionDigits: number
	maximumFractionDigits: number
	style: string
	currency: string
}

const NumberInput = ({ formatOptions, label }) => (
	<NumInput.Root
		min={0}
		max={10}
		allowMouseWheel
		formatOptions={formatOptions()}
		class=''
	>
		<NumInput.Scrubber />
		<NumInput.Label class='text-neutral-200 text-xs'>
			{label}
		</NumInput.Label>
		<div class='flex flex-row h-7 border bg-opacity-0 border-white border-opacity-25'>
			<NumInput.Input class='bg-white w-20 text-neutral-200 bg-opacity-0' />
			<NumInput.Control class='flex flex-col'>
				<NumInput.IncrementTrigger class='border border-r-0 border-t-0 border-white border-opacity-25 w-8 flex justify-center items-center'>
					<BiRegularCaretUp
						size={12}
						color='white'
						class='opacity-50'
					/>
				</NumInput.IncrementTrigger>
				<NumInput.DecrementTrigger class='border border-r-0 border-t-0 border-b-0 border-white border-opacity-25 w-8 flex justify-center items-center'>
					<BiRegularCaretDown
						size={12}
						color='white'
						class='opacity-50'
					/>
				</NumInput.DecrementTrigger>
			</NumInput.Control>
		</div>
	</NumInput.Root>
)

export default NumberInput
