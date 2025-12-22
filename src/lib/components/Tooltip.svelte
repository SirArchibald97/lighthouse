<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		sideOffset,
		alignOffset,
		trigger,
		content
	}: { sideOffset?: number; alignOffset?: number; trigger: Snippet; content: Snippet } = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={100}>
		<Tooltip.Trigger>
			{@render trigger()}
		</Tooltip.Trigger>
		<Tooltip.Content
			class="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-20 origin-(--bits-tooltip-content-transform-origin)"
			side="top"
			align="center"
			sideOffset={sideOffset || 4}
			alignOffset={alignOffset || 0}
		>
			<div class="rounded-md bg-neutral-800 px-2 py-1 text-sm">
				{@render content()}
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
