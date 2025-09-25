<script lang="ts">
	// Props
	// data: Array of pie slices, each containing a colour, the start percentage and the end percentage (0-100)
	// size: String denoting the size of the pie chart, can be: "small", "medium", "large" (default: "medium")
	// icon: The icon to display in the center of the pie chart (optional)
	// backgroundColour: The background colour of the center of the pie chart (optional, default: bg-neutral-900)
	type PieChartProps = {
		data: { colour: string; startPercentage: number; endPercentage: number }[];
		size?: 'small' | 'medium' | 'large';
		icon?: string;
		backgroundColour?: string;
	};

	const { data, size, icon, backgroundColour }: PieChartProps = $props();
	data.push({
		colour: '#262626',
		startPercentage: data[data.length - 1].endPercentage,
		endPercentage: 100
	});

	const slices = data.map((d) => `${d.colour} ${d.startPercentage}% ${d.endPercentage}%`).join(', ');

	const sizeClasses = {
		small: { inner: 'size-16', outer: 'size-20', icon: 'size-8' },
		medium: { inner: 'size-24', outer: 'size-32', icon: 'size-12' },
		large: { inner: 'size-32', outer: 'size-44', icon: 'size-16' }
	};
	const sizeClass = sizeClasses[size || 'medium'];
</script>

<span class="flex {sizeClass.outer} items-center justify-center rounded-full" style="background: conic-gradient({slices})">
	<span class="flex {sizeClass.inner} items-center justify-center rounded-full {backgroundColour || 'bg-darkbg'}">
		{#if icon}
			<img src={icon} alt="" class={sizeClass.icon} />
		{/if}
	</span>
</span>
