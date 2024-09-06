import { Index, Portal, Show } from "solid-js/web"
import { Select } from "@ark-ui/solid"
import { BiRegularExpandVertical } from "solid-icons/bi"

export const SelectTicker = ({ setSelectedItem, items, selectedItem }) => {
	return (
		<Show when={items() && selectedItem() && items().length}>
			<Select.Root
				items={items()}
				onValueChange={(e) => setSelectedItem(e.items[0])}
				defaultValue={[selectedItem().value]}
				class={`border  border-white border-opacity-25 flex flex-row rounded-md justify-between w-28 items-center`}
			>
				<Select.Control class='w-full'>
					<Select.Trigger class='pl-3 pr-2 py-1 flex flex-row justify-between items-center w-full'>
						<Select.ValueText
							class='text-white opacity-75 '
							placeholder='Select a Framework'
						/>
						<div>
							<BiRegularExpandVertical
								size={16}
								class='opacity-25'
								color='#fff'
							/>
						</div>
					</Select.Trigger>
				</Select.Control>
				<Portal>
					<Select.Positioner>
						<Select.Content class='relative'>
							<Select.ItemGroup class='border-white border w-28 absolute -bottom-11 border-opacity-25'>
								<Index each={items()}>
									{(item) => (
										<Select.Item
											class='hover:bg-slate-500 pl-3 cursor-pointer'
											item={item()}
										>
											<Select.ItemText
												class={`${
													item().disabled
														? "opacity-30"
														: ""
												} text-white cursor-pointer`}
											>
												{item().label}
											</Select.ItemText>
										</Select.Item>
									)}
								</Index>
							</Select.ItemGroup>
						</Select.Content>
					</Select.Positioner>
				</Portal>
				<Select.HiddenSelect />
			</Select.Root>
		</Show>
	)
}
