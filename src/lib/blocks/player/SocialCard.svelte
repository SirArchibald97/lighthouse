<script lang="ts">
	import type { Player } from "$lib/types";

    export let player: Player | undefined;
</script>

<div>
    <p>{player?.username}</p>
</div>