<script lang="ts">
	// text shown in the text-area
	let text = '';

	// create a custom blob
	const customType = 'application/something.custom.org+json';
	const objCustom = { type: 'custom' };
	const customJSONBlob = new Blob([JSON.stringify(objCustom)], {
		type: customType
	});

	// create a custom plain text blob
	const objPlain = { type: 'plain' };
	const plainTextBlob = new Blob([JSON.stringify(objPlain)], { type: 'text/plain' });

	// copy both custom and plain text blob to the clipboard
	async function copyToClipboard() {
		try {
			const clipboardItem = new ClipboardItem({
				[plainTextBlob.type]: plainTextBlob,
				[`web ${customJSONBlob.type}`]: customJSONBlob
			});
			await navigator.clipboard.write([clipboardItem]);
		} catch (err: unknown) {
			console.error(err);
		}
	}

	// paste just the custom blob to the text area
	async function pasteCustomToTextArea() {
		try {
			const clipboardItems = await navigator.clipboard.read();
			for (const clipboardItem of clipboardItems) {
				console.log(clipboardItem.types);
				for (const type of clipboardItem.types) {
					if (!type.startsWith('web ')) {
						continue;
					}
					const blob = await clipboardItem.getType(type);
					text = await blob.text();
				}
			}
		} catch (err: unknown) {
			console.log(err);
		}
	}

	// paste just the plain text to the text area
	async function pastePlainToTextArea() {
		try {
			const clipboardItems = await navigator.clipboard.read();
			for (const clipboardItem of clipboardItems) {
				console.log(clipboardItem.types);
				for (const type of clipboardItem.types) {
					if (!type.startsWith('text/plain')) {
						continue;
					}
					const blob = await clipboardItem.getType(type);
					text = await blob.text();
				}
			}
		} catch (err: unknown) {
			console.log(err);
		}
	}
</script>

<button id="copyButton" on:click={copyToClipboard}> copy </button>
<button id="customPasteButton" on:click={pasteCustomToTextArea}> Custom format paste </button>
<button id="plainPasteButton" on:click={pastePlainToTextArea}> Plain format paste </button>
<textarea bind:value={text} />
